/**
 * Índice de rutas API
 * @module routes/api
 */

const express = require('express');
const router = express.Router();

const raffleRoutes = require('./raffles');
const purchaseRoutes = require('./purchases');
const paymentRoutes = require('./payments');

// Montar rutas
router.use('/raffles', raffleRoutes);
router.use('/purchases', purchaseRoutes);
router.use('/payments', paymentRoutes);

// Ruta de stats (acceso directo)
router.get('/stats', require('../../controllers/purchaseController').getStats);

// Ruta de categories (acceso directo)
router.get('/categories', require('../../controllers/raffleController').getCategories);

module.exports = router;
