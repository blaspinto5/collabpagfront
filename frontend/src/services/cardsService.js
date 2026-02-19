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
};

export default cardsService;
