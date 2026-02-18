/**
 * Índice de rutas API
 * @module routes/api
 */

const express = require('express');
const router = express.Router();

const raffleRoutes = require('./raffles');
const purchaseRoutes = require('./purchases');
const paymentRoutes = require('./payments');
const assetsRoutes = require('./assets');
const cardsRoutes = require('./cards');
const ordersRoutes = require('./orders');

// Montar rutas
router.use('/raffles', raffleRoutes);
router.use('/purchases', purchaseRoutes);
router.use('/payments', paymentRoutes);
router.use('/assets', assetsRoutes);
router.use('/cards', cardsRoutes);
router.use('/orders', ordersRoutes);

// Nota: los endpoints específicos como /purchases/stats y /raffles/categories
// están definidos en sus routers respectivos para mantener la estructura.

module.exports = router;
