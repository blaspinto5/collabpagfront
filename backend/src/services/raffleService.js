/**
 * Raffle Service (Prisma-backed)
 * @module services/raffleService
 */

const prisma = require('../db/prisma');

const getAllRaffles = async (filters = {}) => {
  try {
    const where = {};
    if (filters.category && filters.category !== 'all') where.category = filters.category;
    if (typeof filters.status !== 'undefined') {
      if (filters.status !== 'all') where.status = filters.status.toUpperCase();
    } else {
      // default to active
      where.status = 'ACTIVE';
    }

    const raffles = await prisma.sorteo.findMany({
      where,
      orderBy: { drawDate: 'asc' }
    });

    // serialize decimals to numbers
    return raffles.map(serializeRaffle);
  } catch (error) {
    throw new Error(`Failed to fetch raffles: ${error.message}`);
  }
};

const getRaffleById = async (id) => {
  const nid = Number(id);
  if (isNaN(nid)) {
    const err = new Error('Parámetro inválido');
    err.statusCode = 400;
    throw err;
  }
  try {
    const raffle = await prisma.sorteo.findUnique({ where: { id: nid } });
    if (!raffle) {
      const err = new Error('Sorteo no encontrado');
      err.statusCode = 404;
      throw err;
    }
    return serializeRaffle(raffle);
  } catch (error) {
    throw error;
  }
};

const createRaffle = async (data) => {
  try {
    // validate required fields
    const missing = [];
    if (!data || !data.title) missing.push('title');
    if (!data || (typeof data.prize === 'undefined' || data.prize === null)) missing.push('prize');
    if (!data || (typeof data.ticketPrice === 'undefined' || data.ticketPrice === null)) missing.push('ticketPrice');
    if (!data || (typeof data.totalTickets === 'undefined' || data.totalTickets === null)) missing.push('totalTickets');
    if (missing.length) {
      const err = new Error(`Faltan campos requeridos: ${missing.join(', ')}`);
      err.statusCode = 400;
      throw err;
    }
    const payload = {
      title: data.title,
      description: data.description || null,
      prize: data.prize,
      prizeValue: typeof data.prizeValue !== 'undefined' ? String(data.prizeValue) : null,
      image: data.image || null,
      ticketPrice: String(data.ticketPrice),
      totalTickets: Number(data.totalTickets),
      ticketsSold: typeof data.ticketsSold !== 'undefined' ? Number(data.ticketsSold) : 0,
      drawDate: data.drawDate ? new Date(data.drawDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      status: data.status ? data.status.toUpperCase() : undefined,
      category: data.category || null,
      winners: typeof data.winners !== 'undefined' ? Number(data.winners) : 1
    };

    const created = await prisma.sorteo.create({ data: payload });
    return serializeRaffle(created);
  } catch (error) {
      // Preserve existing status codes (e.g. validation errors) when rethrowing
      if (error && error.statusCode) throw error;
      const err = new Error(`Failed to create raffle: ${error.message}`);
      err.statusCode = 500;
      throw err;
  }
};

const updateRaffle = async (id, updates) => {
  const nid = Number(id);
  if (isNaN(nid)) {
    const err = new Error('Parámetro inválido');
    err.statusCode = 400;
    throw err;
  }
  try {
    const payload = { ...updates };
    if (typeof updates.drawDate !== 'undefined') payload.drawDate = updates.drawDate ? new Date(updates.drawDate) : null;
    if (typeof updates.endDate !== 'undefined') payload.endDate = updates.endDate ? new Date(updates.endDate) : null;
    if (typeof updates.ticketPrice !== 'undefined') payload.ticketPrice = String(updates.ticketPrice);
    if (typeof updates.prizeValue !== 'undefined') payload.prizeValue = String(updates.prizeValue);
    if (typeof updates.status !== 'undefined') payload.status = updates.status ? updates.status.toUpperCase() : undefined;

    const updated = await prisma.sorteo.update({ where: { id: nid }, data: payload });
    return serializeRaffle(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      const err = new Error('Sorteo no encontrado');
      err.statusCode = 404;
      throw err;
    }
    throw error;
  }
};

const deleteRaffle = async (id) => {
  const nid = Number(id);
  if (isNaN(nid)) {
    const err = new Error('Parámetro inválido');
    err.statusCode = 400;
    throw err;
  }
  try {
    await prisma.sorteo.delete({ where: { id: nid } });
    return true;
  } catch (error) {
    if (error.code === 'P2025') {
      const err = new Error('Sorteo no encontrado');
      err.statusCode = 404;
      throw err;
    }
    throw error;
  }
};

const getCategories = async () => {
  const cats = await prisma.sorteo.findMany({
    where: { category: { not: null } },
    distinct: ['category'],
    select: { category: true }
  });
  // map to legacy shape: { id, name, icon }
  return cats.map(c => ({ id: c.category, name: c.category, icon: null }));
};

const incrementTicketsSold = async (id, count) => {
  const nid = Number(id);
  if (isNaN(nid)) {
    const err = new Error('Parámetro inválido');
    err.statusCode = 400;
    throw err;
  }
  try {
    const updated = await prisma.sorteo.update({
      where: { id: nid },
      data: { ticketsSold: { increment: Number(count) } }
    });
    return serializeRaffle(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      const err = new Error('Sorteo no encontrado');
      err.statusCode = 404;
      throw err;
    }
    throw error;
  }
};

module.exports = {
  getAllRaffles,
  getRaffleById,
  createRaffle,
  updateRaffle,
  deleteRaffle,
  getCategories,
  incrementTicketsSold
};

function serializeRaffle(r) {
  if (!r) return r;
  const ticketPrice = r.ticketPrice != null ? Number(r.ticketPrice) : null;
  const prizeValue = r.prizeValue != null ? Number(r.prizeValue) : null;
  return {
    ...r,
    ticketPrice,
    prizeValue
  };
}
