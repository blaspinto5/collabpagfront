const express = require('express');
const router = express.Router();
const { resolveCardImagePath } = require('../../utils/images');
const prisma = require('../../db/prisma');

// POST /api/cards - create card
router.post('/', async (req, res, next) => {
  try {
    const { titulo, descripcion, imageFile, imagenUrl, precio, sorteoId } = req.body;

    // require an image reference (either local filename or imagenUrl)
    if (!imageFile && !imagenUrl) {
      const err = new Error('Imagen requerida (imageFile o imagenUrl)');
      err.statusCode = 400;
      throw err;
    }

    let imagePath = null;
    if (imageFile) imagePath = resolveCardImagePath(imageFile);
    else if (imagenUrl) imagePath = resolveCardImagePath(imagenUrl);

    // build metadata object only with provided fields
    const metadata = {};
    if (typeof descripcion !== 'undefined') metadata.descripcion = descripcion;
    if (typeof precio !== 'undefined') metadata.precio = precio;

    const created = await prisma.tarjetaIlustracion.create({
      data: {
        title: titulo || 'Untitled',
        image: imagePath || null,
        metadata: Object.keys(metadata).length > 0 ? metadata : null,
        sorteoId: typeof sorteoId !== 'undefined' && sorteoId !== null ? Number(sorteoId) : null
      }
    });

    res.status(201).json(created);
  } catch (err) {
    if (err.statusCode === 400) return res.status(400).json({ error: err.message });
    next(err);
  }
});

// PUT /api/cards/:id - update card
router.put('/:id', async (req, res, next) => {
  try {

    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Parámetro inválido' });
    const { titulo, descripcion, imageFile, imagenUrl, precio, sorteoId } = req.body;

    // prepare updates
    const updates = {};
    if (typeof titulo !== 'undefined') updates.title = titulo;
    if (typeof sorteoId !== 'undefined') updates.sorteoId = sorteoId !== null ? Number(sorteoId) : null;
    if (imageFile) updates.image = resolveCardImagePath(imageFile);
    else if (imagenUrl) updates.image = resolveCardImagePath(imagenUrl);

    // handle metadata merge
    if (typeof descripcion !== 'undefined' || typeof precio !== 'undefined') {
      const existing = await prisma.tarjetaIlustracion.findUnique({ where: { id } });
      const existingMeta = existing && existing.metadata ? existing.metadata : {};
      const newMeta = { ...existingMeta };
      if (typeof descripcion !== 'undefined') newMeta.descripcion = descripcion;
      if (typeof precio !== 'undefined') newMeta.precio = precio;
      updates.metadata = Object.keys(newMeta).length > 0 ? newMeta : null;
    }

    const updated = await prisma.tarjetaIlustracion.update({ where: { id }, data: updates });

    res.json(updated);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Tarjeta no encontrada' });
    if (err.statusCode === 400) return res.status(400).json({ error: err.message });
    next(err);
  }
});

    // GET /api/cards - list cards with optional sorteoId filter and pagination
    router.get('/', async (req, res, next) => {
      try {
        const { sorteoId } = req.query;
        let page = parseInt(req.query.page || '1', 10);
        let limit = parseInt(req.query.limit || '20', 10);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 20;
        if (limit > 50) limit = 50;

        const where = {};
        if (typeof sorteoId !== 'undefined') {
          const sId = Number(sorteoId);
          if (isNaN(sId)) return res.status(400).json({ error: 'Parámetro inválido' });
          where.sorteoId = sId;
        }

        const total = await prisma.tarjetaIlustracion.count({ where });
        const data = await prisma.tarjetaIlustracion.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit
        });

        res.json({ data, meta: { page, limit, total } });
      } catch (err) {
        next(err);
      }
    });

    // GET /api/cards/:id - get card by id
    router.get('/:id', async (req, res, next) => {
      try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: 'Parámetro inválido' });

        const card = await prisma.tarjetaIlustracion.findUnique({ where: { id } });
        if (!card) return res.status(404).json({ error: 'Tarjeta no encontrada' });

        res.json(card);
      } catch (err) {
        next(err);
      }
    });

module.exports = router;
