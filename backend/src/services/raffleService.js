/**
 * Raffle Service
 * Business logic for raffle operations
 * @module services/raffleService
 */

const Raffle = require('../models/Raffle');

/**
 * @typedef {Object} RaffleFilters
 * @property {string} [category] - Filter by category
 * @property {string} [status] - Filter by status
 */

/**
 * Get all raffles with optional filters
 * @param {RaffleFilters} filters
 * @returns {Promise<Array>}
 */
const getAllRaffles = async (filters = {}) => {
  try {
    return Raffle.getAll(filters);
  } catch (error) {
    throw new Error(`Failed to fetch raffles: ${error.message}`);
  }
};

/**
 * Get single raffle by ID
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
const getRaffleById = async (id) => {
  try {
    const raffle = Raffle.getById(id);
    if (!raffle) {
      const error = new Error('Raffle not found');
      error.statusCode = 404;
      throw error;
    }
    return raffle;
  } catch (error) {
    throw error;
  }
};

/**
 * Create new raffle
 * @param {Object} data
 * @returns {Promise<Object>}
 */
const createRaffle = async (data) => {
  try {
    return Raffle.create(data);
  } catch (error) {
    throw new Error(`Failed to create raffle: ${error.message}`);
  }
};

/**
 * Update existing raffle
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Object>}
 */
const updateRaffle = async (id, data) => {
  try {
    const raffle = Raffle.update(id, data);
    if (!raffle) {
      const error = new Error('Raffle not found');
      error.statusCode = 404;
      throw error;
    }
    return raffle;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete raffle
 * @param {number} id
 * @returns {Promise<boolean>}
 */
const deleteRaffle = async (id) => {
  try {
    const deleted = Raffle.delete(id);
    if (!deleted) {
      const error = new Error('Raffle not found');
      error.statusCode = 404;
      throw error;
    }
    return true;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all categories
 * @returns {Promise<Array>}
 */
const getCategories = async () => {
  return Raffle.getCategories();
};

/**
 * Increment tickets sold for a raffle
 * @param {number} id
 * @param {number} count
 * @returns {Promise<Object>}
 */
const incrementTicketsSold = async (id, count) => {
  try {
    const raffle = Raffle.incrementTicketsSold(id, count);
    if (!raffle) {
      const error = new Error('Raffle not found');
      error.statusCode = 404;
      throw error;
    }
    return raffle;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRaffles,
  getRaffleById,
  createRaffle,
  updateRaffle,
  deleteRaffle,
  getCategories,
  incrementTicketsSold
};
