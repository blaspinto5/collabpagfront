const fs = require('fs');
const path = require('path');
const Illustration = require('../models/Illustration');
const Purchase = require('../models/Purchase');

const DATA_FILE = path.join(__dirname, '../../data/purchases.json');

const confirmPurchase = (purchaseId) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  const purchase = data.find(p => p.id === parseInt(purchaseId));
  if (!purchase) {
    throw new Error('Compra no encontrada');
  }
  // Asignar número de ilustración comprado
  const illustration = Illustration.getById(purchase.illustrationId);
  if (!illustration) {
    throw new Error('Ilustración no encontrada');
  }
  purchase.status = 'confirmed';
  purchase.illustrationNumber = illustration.number;
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  return purchase;
};

module.exports = {
  confirmPurchase
};
