/**
 * Purchase Controller
 * HTTP request handlers for purchase endpoints
 * @module controllers/purchaseController
 */

const { purchaseService } = require('../services');

/**
 * Get all purchases
 * @route GET /api/purchases
 */
const getAll = async (req, res, next) => {
  try {
    const { raffleId, status } = req.query;
    const purchases = await purchaseService.getAllPurchases({ raffleId, status });
    res.json(purchases);
  } catch (error) {
    next(error);
  }
};

/**
 * Get purchase by ID
 * @route GET /api/purchases/:id
 */
const getById = async (req, res, next) => {
  try {
    const purchase = await purchaseService.getPurchaseById(req.params.id);
    res.json(purchase);
  } catch (error) {
    next(error);
  }
};

/**
 * Confirm purchase and assign tickets
 * @route POST /api/purchases/:id/confirm
 */
const confirm = async (req, res, next) => {
  try {
    const result = await purchaseService.confirmPurchase(req.params.id);
    res.json({
      ...result,
      message: 'Purchase confirmed successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get statistics
 * @route GET /api/stats
 */
const getStats = async (req, res, next) => {
  try {
    const stats = await purchaseService.getStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  confirm,
  getStats
};
