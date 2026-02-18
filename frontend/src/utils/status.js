/**
 * Utilities for normalizing and mapping statuses
 */

export const normalizeEnum = (v) => {
  if (v == null) return null;
  try {
    return String(v).toUpperCase();
  } catch (e) {
    return null;
  }
};

export const raffleIsActive = (status) => {
  return normalizeEnum(status) === 'ACTIVE';
};

/**
 * Map purchase status to CSS class + human label (Spanish)
 * Supported statuses: PENDING, CONFIRMED, CANCELLED, FAILED
 */
export const purchaseStatusLabel = (status) => {
  const s = normalizeEnum(status) || '';
  switch (s) {
    case 'PENDING':
      return { cls: 'bg-yellow-500/20 text-yellow-400', label: 'Pendiente' };
    case 'CONFIRMED':
      return { cls: 'bg-green-500/20 text-green-400', label: 'Confirmado' };
    case 'CANCELLED':
    case 'CANCELED':
      return { cls: 'bg-red-500/20 text-red-400', label: 'Cancelado' };
    case 'FAILED':
      return { cls: 'bg-red-600/20 text-red-500', label: 'Fallido' };
    default:
      return { cls: 'bg-slate-500/10 text-slate-300', label: s || 'Desconocido' };
  }
};

/**
 * Map raffle status to CSS class + human label (Spanish)
 * Supported raffle statuses: ACTIVE, CLOSED, CANCELLED
 */
export const raffleStatusLabel = (status) => {
  const s = normalizeEnum(status) || '';
  switch (s) {
    case 'ACTIVE':
      return { cls: 'bg-green-500/20 text-green-400', label: 'Activo' };
    case 'CLOSED':
      return { cls: 'bg-slate-400/10 text-slate-300', label: 'Cerrado' };
    case 'CANCELLED':
    case 'CANCELED':
      return { cls: 'bg-red-500/20 text-red-400', label: 'Cancelado' };
    default:
      return { cls: 'bg-slate-500/10 text-slate-300', label: s || 'Desconocido' };
  }
};

export default {
  normalizeEnum,
  raffleIsActive,
  purchaseStatusLabel,
  raffleStatusLabel
};
