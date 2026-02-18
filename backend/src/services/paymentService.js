/**
 * Payment Service
 * Business logic for MercadoPago payment operations
 * @module services/paymentService
 */

const { Preference, client } = require('../config/mercadopago');
const config = require('../config');
const purchaseService = require('./purchaseService');
const raffleService = require('./raffleService');

/**
 * @typedef {Object} PaymentData
 * @property {number} raffleId
 * @property {number} ticketCount
 * @property {string} buyerName
 * @property {string} buyerEmail
 * @property {string} [buyerPhone]
 */

/**
 * Create MercadoPago payment preference
 * @param {PaymentData} data
 * @returns {Promise<Object>}
 */
const createPaymentPreference = async (data) => {
  const { raffleId, ticketCount, buyerName, buyerEmail, buyerPhone } = data;

  // Validate raffle exists and has tickets available
  const raffle = await raffleService.getRaffleById(raffleId);
  
  const remainingTickets = raffle.totalTickets - raffle.ticketsSold;
  if (ticketCount > remainingTickets) {
    const error = new Error(`Only ${remainingTickets} tickets available`);
    error.statusCode = 400;
    throw error;
  }

  const total = raffle.ticketPrice * ticketCount;
  // Dev/feature-flag: disable payments when configured so
  if (config.paymentsEnabled === false) {
    const err = new Error('Pagos deshabilitados en este entorno');
    err.statusCode = 503;
    throw err;
  }

  // Ensure MercadoPago configured and client is initialized
  if (!config.mercadopago.accessToken || !client) {
    const err = new Error('MercadoPago no configurado');
    err.statusCode = 503;
    throw err;
  }

  // Create MercadoPago preference
  const preference = new Preference(client);
  const preferenceData = {
    items: [{
      title: `${ticketCount} boleto(s) - ${raffle.title}`,
      unit_price: Number(raffle.ticketPrice),
      quantity: ticketCount,
      currency_id: 'CLP'
    }],
    payer: {
      name: buyerName,
      email: buyerEmail,
      phone: { number: buyerPhone || '' }
    },
    back_urls: {
      success: `${config.frontendUrl}/payment/success`,
      failure: `${config.frontendUrl}/payment/failure`,
      pending: `${config.frontendUrl}/payment/pending`
    },
    auto_return: 'approved',
    external_reference: `raffle_${raffleId}_${Date.now()}`
  };

  let response;
  try {
    response = await preference.create({ body: preferenceData });
  } catch (e) {
    // Map MercadoPago unauthorized to 502
    const msg = String(e?.message || '');
    if (msg.toUpperCase().includes('UNAUTHORIZED') || e?.status === 401 || e?.statusCode === 401) {
      const err = new Error('MercadoPago UNAUTHORIZED: revisa MP_ACCESS_TOKEN');
      err.statusCode = 502;
      throw err;
    }
    // rethrow original error otherwise
    throw e;
  }

  // Save pending purchase (compatibility with purchaseService implementations)
  const createFn = purchaseService.createPurchase || purchaseService.create;
  if (!createFn) {
    const err = new Error('Purchase creation method not found');
    err.statusCode = 500;
    throw err;
  }
  const purchase = await createFn({
    preferenceId: response.id,
    raffleId: Number(raffleId),
    raffleName: raffle.title,
    buyerName,
    buyerEmail,
    buyerPhone: buyerPhone || '',
    ticketCount: Number(ticketCount),
    ticketPrice: Number(raffle.ticketPrice),
    total: Number(total)
  });

  return {
    preferenceId: response.id,
    initPoint: response.init_point,
    sandboxInitPoint: response.sandbox_init_point,
    purchaseId: purchase.id,
    total
  };
};

/**
 * Process MercadoPago webhook notification
 * @param {Object} notification
 * @returns {Promise<Object>}
 */
const processWebhook = async (notification) => {
  const { type, data } = notification;
  
  console.log('Webhook received:', { type, dataId: data?.id });

  if (type === 'payment') {
    // In production, verify payment status with MercadoPago API
    // and auto-confirm purchase if approved
    return { processed: true, type, id: data?.id };
  }

  return { processed: false, type };
};

module.exports = {
  createPaymentPreference,
  processWebhook
};
