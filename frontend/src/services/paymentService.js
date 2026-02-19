/**
 * Payment Service
 * API calls for MercadoPago payment operations
 */

import { apiFetch } from './api';
import { ENDPOINTS } from './endpoints';

export const paymentService = {
  /**
   * Create payment preference for ticket purchase
   */
  createPreference: async (purchaseData) => {
    return apiFetch(ENDPOINTS.PAYMENT_CREATE_PREFERENCE, {
      method: 'POST',
      body: JSON.stringify(purchaseData),
    });
  },
};

export default paymentService;
