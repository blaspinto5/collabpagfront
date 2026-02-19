/**
 * Cards Service
 * Helper to list tarjeta ilustracion by raffle
 */

import { apiFetch } from './api';
import { ENDPOINTS } from './endpoints';
import normalizeCardsResponse from './normalizers/cards';

export const cardsService = {
  /**
   * listByRaffle - returns array of cards (use limit=1 to pick one)
   */
  listByRaffle: async (sorteoId, limit = 1) => {
    const params = new URLSearchParams();
    if (sorteoId != null) params.set('sorteoId', String(sorteoId));
    if (limit != null) params.set('limit', String(limit));

    const endpoint = `${ENDPOINTS.CARDS}?${params.toString()}`;
    const res = await apiFetch(endpoint);
    return normalizeCardsResponse(res);
  },
  /**
   * listAll - list cards (global) with pagination
   * returns { cards: Array, meta: Object }
   */
  listAll: async (page = 1, limit = 32) => {
    const params = new URLSearchParams();
    if (page != null) params.set('page', String(page));
    if (limit != null) params.set('limit', String(limit));

    const endpoint = `${ENDPOINTS.CARDS}?${params.toString()}`;
    const res = await apiFetch(endpoint);
    const cards = normalizeCardsResponse(res);
    const meta = res && res.meta ? res.meta : null;
    return { cards, meta };
  },
};

export default cardsService;
