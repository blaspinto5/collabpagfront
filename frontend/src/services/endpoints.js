/**
 * Central endpoints constants (paths only, no /api prefix)
 */
export const ENDPOINTS = {
  RAFFLES: '/raffles',
  RAFFLES_CATEGORIES: '/raffles/categories',
  CARDS: '/cards',
  PURCHASES: '/purchases',
  PAYMENT_CREATE_PREFERENCE: '/payments/create-preference',
  ORDERS_DEV_CHECKOUT: '/orders/dev-checkout'
};

export const RAFFLE_BY_ID = (id) => `/raffles/${id}`;

export default ENDPOINTS;
