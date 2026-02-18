const express = require('express');
const router = express.Router();
const prisma = require('../../db/prisma');

// POST /api/orders/dev-checkout
router.post('/dev-checkout', async (req, res) => {
  try {
    const { sorteoId, tarjetaId, ticketCount, buyerName, buyerEmail, buyerPhone } = req.body;

    const sId = Number(sorteoId);
    const tId = Number(tarjetaId);
    const qty = Number(ticketCount);

    if (!buyerName?.trim() || !buyerEmail?.trim()) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    if (!Number.isFinite(sId) || sId <= 0 || !Number.isFinite(tId) || tId <= 0) {
      return res.status(400).json({ error: 'IDs inválidos' });
    }

    if (!Number.isInteger(qty) || qty <= 0) {
      return res.status(400).json({ error: 'ticketCount debe ser entero positivo' });
    }

    // Transactional flow
    const result = await prisma.$transaction(async (tx) => {
      const sorteo = await tx.sorteo.findUnique({ where: { id: sId } });
      if (!sorteo) {
        const err = new Error('Sorteo no encontrado');
        err.statusCode = 404;
        throw err;
      }
      if (sorteo.status !== 'ACTIVE') {
        const err = new Error('Sorteo no está activo');
        err.statusCode = 400;
        throw err;
      }

      const tarjeta = await tx.tarjetaIlustracion.findUnique({ where: { id: tId } });
      if (!tarjeta || tarjeta.sorteoId !== sorteo.id) {
        const err = new Error('Tarjeta no encontrada o no pertenece al sorteo');
        err.statusCode = 400;
        throw err;
      }

      // atomic reservation: increment ticketsSold only if enough tickets remain and sorteo is ACTIVE
      const updateRes = await tx.sorteo.updateMany({
        where: {
          id: sId,
          status: 'ACTIVE',
          ticketsSold: { lte: sorteo.totalTickets - qty }
        },
        data: { ticketsSold: { increment: qty } }
      });

      if (updateRes.count === 0) {
        const err = new Error('Tickets insuficientes o sorteo no activo');
        err.statusCode = 400;
        throw err;
      }

      const updatedSorteo = await tx.sorteo.findUnique({ where: { id: sId } });
      const start = updatedSorteo.ticketsSold - qty + 1;

      // Create order with temporary orderNumber (will update to id)
      const orderData = {
        orderNumber: 0,
        sorteoId: sorteo.id,
        raffleName: sorteo.title,
        buyerName: buyerName,
        buyerEmail: buyerEmail,
        buyerPhone: buyerPhone || null,
        ticketCount: qty,
        ticketPrice: String(sorteo.ticketPrice),
        total: String(Number(sorteo.ticketPrice) * qty),
        status: 'CONFIRMED',
        paymentProvider: null,
        ticketNumbers: null,
        confirmedAt: new Date()
      };

      const createdOrder = await tx.ordenCompra.create({ data: orderData });

      // Set orderNumber = id
      const updatedOrder = await tx.ordenCompra.update({ where: { id: createdOrder.id }, data: { orderNumber: createdOrder.id } });

      // Generate tickets
      const tickets = [];
      for (let i = 0; i < qty; i++) {
        const ticketNumber = start + i;
        const t = await tx.ticket.create({ data: {
          sorteoId: sorteo.id,
          tarjetaId: tarjeta.id,
          ordenId: updatedOrder.id,
          ticketNumber: ticketNumber,
          status: 'ASSIGNED'
        }});
        tickets.push(t);
      }

      // ticketsSold already incremented atomically via updateMany

      return { order: updatedOrder, tickets };
    });

    // serialize decimals to numbers for ticketPrice/total
    const serializedOrder = {
      ...result.order,
      ticketPrice: result.order.ticketPrice != null ? Number(result.order.ticketPrice) : null,
      total: result.order.total != null ? Number(result.order.total) : null
    };

    return res.status(201).json({ order: serializedOrder, tickets: result.tickets });
  } catch (error) {
    const status = error && error.statusCode ? error.statusCode : 500;
    return res.status(status).json({ error: error.message || 'Internal error' });
  }
});

module.exports = router;
