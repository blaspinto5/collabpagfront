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

  // Create MercadoPago preference
  const preference = new Preference(client);
  const preferenceData = {
    items: [{
      title: `${ticketCount} boleto(s) - ${raffle.title}`,
      unit_price: raffle.ticketPrice,
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

  const response = await preference.create({ body: preferenceData });

  // Save pending purchase
  const purchase = await purchaseService.createPurchase({
    preferenceId: response.id,
    raffleId: parseInt(raffleId),
    raffleName: raffle.title,
    buyerName,
    buyerEmail,
    buyerPhone: buyerPhone || '',
    ticketCount: parseInt(ticketCount),
    ticketPrice: raffle.ticketPrice,
    total
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
