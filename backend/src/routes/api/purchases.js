/**
 * Rutas de Compras
 * @module routes/api/purchases
 */

const express = require('express');
const router = express.Router();
const purchaseController = require('../../controllers/purchaseController');

// GET /api/purchases - Obtener todas las compras
router.get('/', purchaseController.getAll);

// GET /api/stats - Obtener estadísticas
router.get('/stats', purchaseController.getStats);

// GET /api/purchases/:id - Obtener compra por ID
router.get('/:id', purchaseController.getById);

// POST /api/purchases/:id/confirm - Confirmar compra
router.post('/:id/confirm', purchaseController.confirm);

module.exports = router;
