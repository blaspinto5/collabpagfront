/**
 * Cards Service
 * Helper to list tarjeta ilustracion by raffle
 */

import { apiFetch } from './api';

export const cardsService = {
  /**
   * listByRaffle - returns array of cards (use limit=1 to pick one)
   */
  listByRaffle: async (sorteoId, limit = 1) => {
    const params = new URLSearchParams();
    if (sorteoId != null) params.set('sorteoId', String(sorteoId));
    if (limit != null) params.set('limit', String(limit));

    const endpoint = `/cards?${params.toString()}`;
    const res = await apiFetch(endpoint);

    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (res.data && Array.isArray(res.data)) return res.data;
    return [];
  },
};

export default cardsService;
