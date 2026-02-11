/**
 * Rutas de Pagos
 * @module routes/api/payments
 */

const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/paymentController');

// POST /api/payments/create-preference - Crear preferencia de pago
router.post('/create-preference', paymentController.createPreference);

// POST /api/payments/webhook - Webhook de MercadoPago
router.post('/webhook', paymentController.webhook);

module.exports = router;
