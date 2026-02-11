/**
 * Purchase Service
 * API calls for purchase-related operations
 */

import { apiFetch } from './api';

export const purchaseService = {
  /**
   * Get all purchases (admin only)
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiFetch(`/purchases${queryString}`);
  },

  /**
   * Get a single purchase by ID
   */
  getById: async (id) => {
    return apiFetch(`/purchases/${id}`);
  },

  /**
   * Confirm a purchase (admin only)
   */
  confirm: async (id) => {
    return apiFetch(`/purchases/${id}/confirm`, {
      method: 'POST',
    });
  },

  /**
   * Get purchase statistics
   */
  getStats: async () => {
    return apiFetch('/purchases/stats');
  },
};

export default purchaseService;
