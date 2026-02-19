/** Status normalizers/helpers */
export function normalizeStatus(s) {
  return String(s || '').trim().toUpperCase();
}

export function isActiveStatus(s) {
  return normalizeStatus(s) === 'ACTIVE';
}

export default { normalizeStatus, isActiveStatus };
