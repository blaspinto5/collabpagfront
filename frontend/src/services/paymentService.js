/**
 * Payment Service
 * API calls for MercadoPago payment operations
 */

import { apiFetch } from './api';

export const paymentService = {
  /**
   * Create payment preference for ticket purchase
   */
  createPreference: async (purchaseData) => {
    return apiFetch('/payments/create-preference', {
      method: 'POST',
      body: JSON.stringify(purchaseData),
    });
  },
};

export default paymentService;
