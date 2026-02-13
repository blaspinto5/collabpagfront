/**
 * Modelo de Ilustración
 * Maneja la persistencia de ilustraciones en archivo JSON
 * @module models/Illustration
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/illustrations.json');

const ensureDataFile = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(getDefaultIllustrations(), null, 2));
  }
};

const getDefaultIllustrations = () => [
  {
    id: 1,
    title: 'Ilustración Fantasía',
    description: 'Arte digital de un mundo fantástico',
    image: 'https://placehold.co/400x300?text=Fantasía',
    price: 5000,
    number: 'ILU-0001',
    createdAt: Date.now()
  },
  {
    id: 2,
    title: 'Ciudad Moderna',
    description: 'Ilustración de una ciudad futurista',
    image: 'https://placehold.co/400x300?text=Ciudad',
    price: 6000,
    number: 'ILU-0002',
    createdAt: Date.now()
  },
  {
    id: 3,
    title: 'Paisaje Natural',
    description: 'Montañas y lagos en acuarela',
    image: 'https://placehold.co/400x300?text=Paisaje',
    price: 4500,
    number: 'ILU-0003',
    createdAt: Date.now()
  }
];

class Illustration {
  static getAll() {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return [...data];
  }

  static getById(id) {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return data.find(i => i.id === parseInt(id)) || null;
  }

  static create(illustration) {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const newIllustration = {
      ...illustration,
      id: data.length ? data[data.length - 1].id + 1 : 1,
      number: `ILU-${String(data.length + 1).padStart(4, '0')}`,
      createdAt: Date.now()
    };
    data.push(newIllustration);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return newIllustration;
  }
}

module.exports = Illustration;
