/**
 * Purchase Service
 * Business logic for purchase operations
 * @module services/purchaseService
 */

const Purchase = require('../models/Purchase');
const Raffle = require('../models/Raffle');

/**
 * Get all purchases with optional filters
 * @param {Object} filters
 * @returns {Promise<Array>}
 */
const getAllPurchases = async (filters = {}) => {
  try {
    return Purchase.getAll(filters);
  } catch (error) {
    throw new Error(`Failed to fetch purchases: ${error.message}`);
  }
};

/**
 * Get purchase by ID
 * @param {number} id
 * @returns {Promise<Object>}
 */
const getPurchaseById = async (id) => {
  try {
    const purchase = Purchase.getById(id);
    if (!purchase) {
      const error = new Error('Purchase not found');
      error.statusCode = 404;
      throw error;
    }
    return purchase;
  } catch (error) {
    throw error;
  }
};

/**
 * Get purchase by MercadoPago preference ID
 * @param {string} preferenceId
 * @returns {Promise<Object|null>}
 */
const getPurchaseByPreferenceId = async (preferenceId) => {
  return Purchase.getByPreferenceId(preferenceId);
};

/**
 * Create new purchase
 * @param {Object} data
 * @returns {Promise<Object>}
 */
const createPurchase = async (data) => {
  try {
    return Purchase.create(data);
  } catch (error) {
    throw new Error(`Failed to create purchase: ${error.message}`);
  }
};

/**
 * Confirm purchase and assign ticket numbers
 * @param {number} purchaseId
 * @returns {Promise<Object>}
 */
const confirmPurchase = async (purchaseId) => {
  try {
    const purchase = Purchase.getById(purchaseId);
    if (!purchase) {
      const error = new Error('Purchase not found');
      error.statusCode = 404;
      throw error;
    }

    if (purchase.status === 'confirmed') {
      const error = new Error('Purchase already confirmed');
      error.statusCode = 400;
      throw error;
    }

    const raffle = Raffle.getById(purchase.raffleId);
    if (!raffle) {
      const error = new Error('Raffle not found');
      error.statusCode = 404;
      throw error;
    }

    // Generate ticket numbers
    const startNumber = raffle.ticketsSold + 1;
    const ticketNumbers = [];
    for (let i = 0; i < purchase.ticketCount; i++) {
      ticketNumbers.push(startNumber + i);
    }

    // Confirm purchase
    const confirmedPurchase = Purchase.confirm(purchaseId, ticketNumbers);
    
    // Update raffle tickets sold
    Raffle.incrementTicketsSold(raffle.id, purchase.ticketCount);

    return {
      purchase: confirmedPurchase,
      ticketNumbers
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Get statistics
 * @returns {Promise<Object>}
 */
const getStats = async () => {
  try {
    const purchaseStats = Purchase.getStats();
    const raffles = Raffle.getAll({ status: 'all' });
    const activeRaffles = raffles.filter(r => r.status === 'active').length;

    return {
      activeRaffles,
      totalRaffles: raffles.length,
      totalTicketsSold: purchaseStats.totalTicketsSold,
      totalRevenue: purchaseStats.totalRevenue,
      totalParticipants: purchaseStats.uniqueBuyers,
      totalPurchases: purchaseStats.totalPurchases,
      confirmedPurchases: purchaseStats.confirmedPurchases,
      pendingPurchases: purchaseStats.pendingPurchases
    };
  } catch (error) {
    throw new Error(`Failed to fetch stats: ${error.message}`);
  }
};

module.exports = {
  getAllPurchases,
  getPurchaseById,
  getPurchaseByPreferenceId,
  createPurchase,
  confirmPurchase,
  getStats
};
