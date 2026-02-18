/**
 * Raffle Controller
 * HTTP request handlers for raffle endpoints
 * @module controllers/raffleController
 */

const { raffleService } = require('../services');

/**
 * Get all raffles
 * @route GET /api/raffles
 */
const getAll = async (req, res, next) => {
  try {
    const { category, status } = req.query;
    const raffles = await raffleService.getAllRaffles({ category, status });
    res.json(raffles);
  } catch (error) {
    next(error);
  }
};

/**
 * Get raffle by ID
 * @route GET /api/raffles/:id
 */
const getById = async (req, res, next) => {
  try {
    const raffle = await raffleService.getRaffleById(req.params.id);
    res.json(raffle);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new raffle
 * @route POST /api/raffles
 */
const create = async (req, res, next) => {
  try {
    const newRaffle = await raffleService.createRaffle(req.body);
    res.status(201).json(newRaffle);
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({ error: error.message });
  }
};

/**
 * Update raffle
 * @route PUT /api/raffles/:id
 */
const update = async (req, res, next) => {
  try {
    const raffle = await raffleService.updateRaffle(req.params.id, req.body);
    res.json(raffle);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete raffle
 * @route DELETE /api/raffles/:id
 */
const remove = async (req, res, next) => {
  try {
    await raffleService.deleteRaffle(req.params.id);
    res.json({ message: 'Raffle deleted successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * Get categories
 * @route GET /api/categories
 */
const getCategories = async (req, res, next) => {
  try {
    const categories = await raffleService.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getCategories
};
