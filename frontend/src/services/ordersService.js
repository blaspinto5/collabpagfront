/**
 * Orders Service
 * Dev-only checkout endpoint wrapper
 */

import { apiFetch } from './api';
import { ENDPOINTS } from './endpoints';

export const ordersService = {
  /**
   * Dev checkout (creates OrdenCompra + Tickets without MercadoPago)
   * payload: { sorteoId, tarjetaId, ticketCount, buyerName, buyerEmail, buyerPhone }
   */
  devCheckout: async (payload) => {
    return apiFetch(ENDPOINTS.ORDERS_DEV_CHECKOUT, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

export default ordersService;
