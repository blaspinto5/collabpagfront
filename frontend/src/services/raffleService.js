/**
 * Raffle Service
 * API calls for raffle-related operations
 */

import { apiFetch } from './api';
import { ENDPOINTS, RAFFLE_BY_ID } from './endpoints';
import { normalizeStatus } from './normalizers/status';

export const raffleService = {
  /**
   * Get all raffles with optional filters
   */
  getAll: async (filters = {}) => {
    const f = { ...filters };
    if (typeof f.status !== 'undefined' && f.status !== null) {
      f.status = normalizeStatus(f.status);
    }
    const params = new URLSearchParams(f);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiFetch(`${ENDPOINTS.RAFFLES}${queryString}`);
  },

  /**
   * Get a single raffle by ID
   */
  getById: async (id) => {
    return apiFetch(RAFFLE_BY_ID(id));
  },

  /**
   * Get all available categories
   */
  getCategories: async () => {
    return apiFetch('/raffles/categories');
  },

  /**
   * Create a new raffle (admin only)
   */
  create: async (raffleData) => {
    return apiFetch(ENDPOINTS.RAFFLES, {
      method: 'POST',
      body: JSON.stringify(raffleData),
    });
  },

  /**
   * Update an existing raffle (admin only)
   */
  update: async (id, raffleData) => {
    return apiFetch(RAFFLE_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(raffleData),
    });
  },

  /**
   * Delete a raffle (admin only)
   */
  delete: async (id) => {
    return apiFetch(RAFFLE_BY_ID(id), {
      method: 'DELETE',
    });
  },
};

export default raffleService;
