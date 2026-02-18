/**
 * buildCardAssetUrl(imagePath)
 * Rules:
 * 1) falsy -> '/images/placeholder.png'
 * 2) absolute URL -> return as-is
 * 3) if path refers to cards (with or without leading /cards/) ->
 *    - in DEV -> return '/cards/<file>' (Vite proxy resolves)
 *    - in PROD -> return `${ORIGIN}/cards/<file>` where ORIGIN = import.meta.env.VITE_API_URL (no trailing slash)
 * 4) never construct /api/... for images
 */
export function buildCardAssetUrl(imagePath) {
  if (!imagePath) return '/images/placeholder.png';

  // If absolute URL, return as-is
  if (/^https?:\/\//i.test(imagePath)) return imagePath;

  // Normalize input: allow '/cards/x.png', 'cards/x.png' or 'x.png'
  let p = imagePath;
  if (p.startsWith('/')) p = p.slice(1);
  if (p.startsWith('cards/')) p = p.replace(/^cards\//, '');

  // DEV: let Vite proxy handle '/cards/*' requests
  if (import.meta.env.DEV) {
    return `/cards/${p}`;
  }

  // PROD: build absolute URL using VITE_API_URL
  let origin = import.meta.env.VITE_API_URL || '';
  origin = String(origin || '').replace(/\/$/, '');
  if (!origin) return `/cards/${p}`; // fallback to relative
  return `${origin}/cards/${p}`;
}

export default { buildCardAssetUrl };
