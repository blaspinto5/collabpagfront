/**
 * Rutas de Sorteos
 * @module routes/api/raffles
 */

const express = require('express');
const router = express.Router();
const raffleController = require('../../controllers/raffleController');

// GET /api/raffles - Obtener todos los sorteos
router.get('/', raffleController.getAll);

// GET /api/raffles/categories - Obtener categorías
router.get('/categories', raffleController.getCategories);

// GET /api/raffles/:id - Obtener sorteo por ID
router.get('/:id', raffleController.getById);

// POST /api/raffles - Crear nuevo sorteo
router.post('/', raffleController.create);

// PUT /api/raffles/:id - Actualizar sorteo
router.put('/:id', raffleController.update);

// DELETE /api/raffles/:id - Eliminar sorteo
router.delete('/:id', raffleController.remove);

module.exports = router;
