const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// GET /api/assets/cards - list image files in public/cards
router.get('/cards', async (req, res, next) => {
  try {
    const cardsDir = path.join(__dirname, '..', '..', '..', 'public', 'cards');

    if (!fs.existsSync(cardsDir)) {
      return res.json({ files: [] });
    }

    const allFiles = await fs.promises.readdir(cardsDir);
    const imageFiles = allFiles.filter(f => /\.(png|jpg|jpeg|webp|svg)$/i.test(f)).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    res.json({ files: imageFiles });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
