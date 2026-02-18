/**
 * Payment Controller
 * HTTP request handlers for payment endpoints
 * @module controllers/paymentController
 */

const { paymentService } = require('../services');

/**
 * Create payment preference
 * @route POST /api/payments/create-preference
 */
const createPreference = async (req, res, next) => {
  try {
    const { raffleId, ticketCount, buyerName, buyerEmail, buyerPhone } = req.body;

    // Basic validation
    if (!raffleId || !ticketCount || !buyerName || !buyerEmail) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['raffleId', 'ticketCount', 'buyerName', 'buyerEmail']
      });
    }

    const result = await paymentService.createPaymentPreference({
      raffleId,
      ticketCount,
      buyerName,
      buyerEmail,
      buyerPhone
    });

    res.json(result);
  } catch (error) {
    const status = error && error.statusCode ? error.statusCode : 500;
    return res.status(status).json({ error: error.message });
  }
};

/**
 * MercadoPago webhook handler
 * @route POST /api/payments/webhook
 */
const webhook = async (req, res, next) => {
  try {
    const result = await paymentService.processWebhook(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error('Webhook error:', error);
    const status = error && error.statusCode ? error.statusCode : 500;
    return res.status(status).json({ error: error.message || 'Webhook processing failed' });
  }
};

module.exports = {
  createPreference,
  webhook
};
