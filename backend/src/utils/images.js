const fs = require('fs');
const path = require('path');

const CARDS_DIR = path.join(__dirname, '..', '..', 'public', 'cards');

function resolveCardImagePath(input) {
  if (!input) return null;

  // reject full URLs
  if (/^https?:\/\//i.test(input)) {
    throw new Error('Invalid image path');
  }

  // reject traversal or backslashes
  if (input.includes('..') || input.includes('\\')) {
    throw new Error('Invalid image path');
  }

  // normalize: accept "img1.png" or "/cards/img1.png"
  let filename = input;
  if (filename.startsWith('/cards/')) filename = filename.replace(/^\/cards\//, '');
  // strip leading slash if provided
  if (filename.startsWith('/')) filename = filename.slice(1);

  const fullPath = path.join(CARDS_DIR, filename);
  if (!fs.existsSync(fullPath)) {
    const err = new Error('Imagen no encontrada en /public/cards');
    err.statusCode = 400;
    throw err;
  }

  return `/cards/${filename}`;
}

module.exports = {
  resolveCardImagePath,
  CARDS_DIR
};
