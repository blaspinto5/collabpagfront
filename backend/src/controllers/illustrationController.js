const Illustration = require('../models/Illustration');

const getAllIllustrations = (req, res) => {
  const illustrations = Illustration.getAll();
  res.json(illustrations);
};

const getIllustrationById = (req, res) => {
  const { id } = req.params;
  const illustration = Illustration.getById(id);
  if (!illustration) {
    return res.status(404).json({ message: 'Ilustración no encontrada' });
  }
  res.json(illustration);
};

const createIllustration = (req, res) => {
  const { title, description, image, price } = req.body;
  if (!title || !description || !image || !price) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }
  const newIllustration = Illustration.create({ title, description, image, price });
  res.status(201).json(newIllustration);
};

module.exports = {
  getAllIllustrations,
  getIllustrationById,
  createIllustration
};
