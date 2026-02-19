/** normalizeCardsResponse
 * Ensures caller receives an array of cards regardless of backend shape
 */
export function normalizeCardsResponse(res) {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (res.data && Array.isArray(res.data)) return res.data;
  return [];
}

export default normalizeCardsResponse;
