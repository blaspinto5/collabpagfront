/**
 * Raffle Service
 * API calls for raffle-related operations
 */

import { apiFetch } from './api';

export const raffleService = {
  /**
   * Get all raffles with optional filters
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiFetch(`/raffles${queryString}`);
  },

  /**
   * Get a single raffle by ID
   */
  getById: async (id) => {
    return apiFetch(`/raffles/${id}`);
  },

  /**
   * Get all available categories
   */
  getCategories: async () => {
    return apiFetch('/categories');
  },

  /**
   * Create a new raffle (admin only)
   */
  create: async (raffleData) => {
    return apiFetch('/raffles', {
      method: 'POST',
      body: JSON.stringify(raffleData),
    });
  },

  /**
   * Update an existing raffle (admin only)
   */
  update: async (id, raffleData) => {
    return apiFetch(`/raffles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(raffleData),
    });
  },

  /**
   * Delete a raffle (admin only)
   */
  delete: async (id) => {
    return apiFetch(`/raffles/${id}`, {
      method: 'DELETE',
    });
  },
};

export default raffleService;
