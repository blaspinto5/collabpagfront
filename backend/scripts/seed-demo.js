const fs = require('fs');
const path = require('path');
require('dotenv').config();

const prisma = require('../src/db/prisma');
const FRONT_IMG_DIR = path.join(__dirname, '..', '..', 'frontend', 'public', 'images');
const BACK_CARDS_DIR = path.join(__dirname, '..', 'public', 'cards');

async function ensureCardsDir() {
  if (!fs.existsSync(BACK_CARDS_DIR)) {
    fs.mkdirSync(BACK_CARDS_DIR, { recursive: true });
    console.log('Creado directorio:', BACK_CARDS_DIR);
  }
}

function copyImage(name) {
  const src = path.join(FRONT_IMG_DIR, name);
  const dst = path.join(BACK_CARDS_DIR, name);
  if (!fs.existsSync(src)) {
    throw new Error(`Imagen fuente no encontrada: ${src}`);
  }
  fs.copyFileSync(src, dst);
  return `/cards/${name}`;
}

async function run() {
  try {
    await ensureCardsDir();

    // copy 5 images from frontend/public/images to backend/public/cards
    const imgs = ['img1.png','img2.png','img3.png','img4.png','img5.png'];
    const copied = [];
    for (const im of imgs) {
      try {
        const p = copyImage(im);
        copied.push(p);
        console.log('Copiada imagen:', im);
      } catch (err) {
        console.warn('No se pudo copiar', im, err.message);
      }
    }

    // create raffle
    const rafflePayload = {
      title: 'Sorteo Demo - Seed',
      description: 'Sorteo creado por seed-demo.js',
      prize: 'Pack demo: ilustración + gift card',
      prizeValue: '15000',
      image: copied[0] || null,
      ticketPrice: '1000',
      totalTickets: 100,
      ticketsSold: 0,
      drawDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      status: 'ACTIVE',
      category: 'DEMO',
      winners: 1
    };

    const createdRaffle = await prisma.sorteo.create({ data: rafflePayload });
    console.log('\n--- RAFFLE CREADO ---');
    console.log('id:', createdRaffle.id);

    // create cards
    const createdCards = [];
    for (let i = 0; i < copied.length; i++) {
      const imgPath = copied[i];
      const card = await prisma.tarjetaIlustracion.create({
        data: {
          title: `Demo Card ${i+1}`,
          image: imgPath,
          metadata: { descripcion: `Demo ${i+1}`, precio: '1000' },
          sorteoId: createdRaffle.id
        }
      });
      createdCards.push(card);
      console.log('Card creada id=', card.id, 'image=', card.image);
    }

    console.log('\n--- RESUMEN ---');
    console.log('Raffle ID:', createdRaffle.id);
    console.log('Cards IDs:', createdCards.map(c => c.id).join(', '));

    // verify by fetching from DB
    const raffles = await prisma.sorteo.findMany({ where: { id: createdRaffle.id } });
    const cards = await prisma.tarjetaIlustracion.findMany({ where: { sorteoId: createdRaffle.id } });
    console.log('\nGET /api/raffles (seeded) ->', JSON.stringify(raffles, null, 2));
    console.log('\nGET /api/cards?sorteoId=<id> ->', JSON.stringify({ data: cards, meta: { total: cards.length } }, null, 2));

    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

run();
