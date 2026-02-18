/**
 * Orders Service
 * Dev-only checkout endpoint wrapper
 */

import { apiFetch } from './api';

export const ordersService = {
  /**
   * Dev checkout (creates OrdenCompra + Tickets without MercadoPago)
   * payload: { sorteoId, tarjetaId, ticketCount, buyerName, buyerEmail, buyerPhone }
   */
  devCheckout: async (payload) => {
    return apiFetch('/orders/dev-checkout', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};

export default ordersService;
