/**
 * Modelo de Sorteo
 * Maneja la persistencia de sorteos en archivo JSON
 * @module models/Raffle
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/raffles.json');

/**
 * Asegura que el archivo de datos existe
 */
const ensureDataFile = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(getDefaultRaffles(), null, 2));
  }
};

/**
 * Sorteos por defecto para demo
 */
const getDefaultRaffles = () => [
  {
    id: 1,
    title: 'iPhone 15 Pro Max',
    description: 'Gana el último iPhone 15 Pro Max 256GB. ¡Totalmente nuevo y sellado!',
    prize: 'iPhone 15 Pro Max 256GB',
    prizeValue: 1299990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=800&hei=800&fmt=jpeg',
    ticketPrice: 2990,
    totalTickets: 500,
    ticketsSold: 127,
    drawDate: '2026-03-15T20:00:00',
    status: 'active',
    category: 'tecnologia',
    winners: 1,
    createdAt: Date.now()
  },
  {
    id: 2,
    title: 'PlayStation 5 + 3 Juegos',
    description: 'Consola PS5 con lector de discos más 3 juegos a elección. ¡El combo gamer definitivo!',
    prize: 'PS5 + 3 Juegos',
    prizeValue: 699990,
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$',
    ticketPrice: 1990,
    totalTickets: 300,
    ticketsSold: 89,
    drawDate: '2026-03-01T20:00:00',
    status: 'active',
    category: 'gaming',
    winners: 1,
    createdAt: Date.now()
  },
  {
    id: 3,
    title: 'Smart TV Samsung 65"',
    description: 'Televisor Samsung Crystal UHD 65 pulgadas 4K. Transforma tu sala en un cine.',
    prize: 'Samsung TV 65" 4K',
    prizeValue: 549990,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/cl/ua65cu7000gxzs/gallery/cl-crystal-uhd-cu7000-ua65cu7000gxzs-thumb-537212632',
    ticketPrice: 1500,
    totalTickets: 400,
    ticketsSold: 234,
    drawDate: '2026-02-28T20:00:00',
    status: 'active',
    category: 'tecnologia',
    winners: 1,
    createdAt: Date.now()
  },
  {
    id: 4,
    title: '$500.000 en Efectivo',
    description: '¡Medio millón de pesos chilenos directo a tu cuenta! Usa el dinero como quieras.',
    prize: '$500.000 CLP',
    prizeValue: 500000,
    image: 'https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?w=800',
    ticketPrice: 990,
    totalTickets: 1000,
    ticketsSold: 456,
    drawDate: '2026-02-20T20:00:00',
    status: 'active',
    category: 'dinero',
    winners: 1,
    createdAt: Date.now()
  },
  {
    id: 5,
    title: 'MacBook Air M3',
    description: 'El nuevo MacBook Air con chip M3, 8GB RAM y 256GB SSD. Potencia y portabilidad.',
    prize: 'MacBook Air M3',
    prizeValue: 999990,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=800&hei=800&fmt=jpeg',
    ticketPrice: 2490,
    totalTickets: 400,
    ticketsSold: 78,
    drawDate: '2026-03-20T20:00:00',
    status: 'active',
    category: 'tecnologia',
    winners: 1,
    createdAt: Date.now()
  },
  {
    id: 6,
    title: 'Viaje a Cancún (2 personas)',
    description: 'Viaje todo incluido a Cancún para 2 personas. 7 días y 6 noches en hotel 5 estrellas.',
    prize: 'Viaje Cancún 7D/6N',
    prizeValue: 2500000,
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800',
    ticketPrice: 4990,
    totalTickets: 500,
    ticketsSold: 112,
    drawDate: '2026-04-01T20:00:00',
    status: 'active',
    category: 'viajes',
    winners: 1,
    createdAt: Date.now()
  }
];

/**
 * Categorías disponibles
 */
const CATEGORIES = [
  { id: 'all', name: 'Todos', icon: 'fa-th-large' },
  { id: 'tecnologia', name: 'Tecnología', icon: 'fa-laptop' },
  { id: 'gaming', name: 'Gaming', icon: 'fa-gamepad' },
  { id: 'dinero', name: 'Dinero', icon: 'fa-money-bill-wave' },
  { id: 'viajes', name: 'Viajes', icon: 'fa-plane' },
  { id: 'hogar', name: 'Hogar', icon: 'fa-home' },
  { id: 'otros', name: 'Otros', icon: 'fa-gift' }
];

class Raffle {
  /**
   * Obtener todos los sorteos
   * @param {Object} filters - Filtros opcionales
   * @returns {Array} Lista de sorteos
   */
  static getAll(filters = {}) {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    let raffles = [...data];

    // Aplicar filtros
    if (filters.category && filters.category !== 'all') {
      raffles = raffles.filter(r => r.category === filters.category);
    }
    if (filters.status && filters.status !== 'all') {
      raffles = raffles.filter(r => r.status === filters.status);
    } else if (!filters.status) {
      raffles = raffles.filter(r => r.status === 'active');
    }
    // Si status === 'all', no filtramos por estado

    // Ordenar por fecha de sorteo
    raffles.sort((a, b) => new Date(a.drawDate) - new Date(b.drawDate));

    return raffles;
  }

  /**
   * Obtener sorteo por ID
   * @param {number} id - ID del sorteo
   * @returns {Object|null} Sorteo encontrado o null
   */
  static getById(id) {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return data.find(r => r.id === parseInt(id)) || null;
  }

  /**
   * Crear nuevo sorteo
   * @param {Object} raffleData - Datos del sorteo
   * @returns {Object} Sorteo creado
   */
  static create(raffleData) {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    
    const newRaffle = {
      id: data.length > 0 ? Math.max(...data.map(r => r.id)) + 1 : 1,
      title: raffleData.title,
      description: raffleData.description || '',
      prize: raffleData.prize,
      prizeValue: raffleData.prizeValue || 0,
      image: raffleData.image || 'https://via.placeholder.com/800x600?text=Premio',
      ticketPrice: parseInt(raffleData.ticketPrice),
      totalTickets: parseInt(raffleData.totalTickets),
      ticketsSold: 0,
      drawDate: raffleData.drawDate,
      status: 'active',
      category: raffleData.category || 'otros',
      winners: raffleData.winners || 1,
      createdAt: Date.now()
    };

    data.push(newRaffle);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    
    return newRaffle;
  }

  /**
   * Actualizar sorteo
   * @param {number} id - ID del sorteo
   * @param {Object} updates - Datos a actualizar
   * @returns {Object|null} Sorteo actualizado o null
   */
  static update(id, updates) {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const index = data.findIndex(r => r.id === parseInt(id));
    
    if (index === -1) return null;

    data[index] = { ...data[index], ...updates, updatedAt: Date.now() };
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    
    return data[index];
  }

  /**
   * Eliminar sorteo
   * @param {number} id - ID del sorteo
   * @returns {boolean} true si se eliminó
   */
  static delete(id) {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const index = data.findIndex(r => r.id === parseInt(id));
    
    if (index === -1) return false;

    data.splice(index, 1);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    
    return true;
  }

  /**
   * Incrementar boletos vendidos
   * @param {number} id - ID del sorteo
   * @param {number} count - Cantidad de boletos
   * @returns {Object|null} Sorteo actualizado
   */
  static incrementTicketsSold(id, count) {
    const raffle = this.getById(id);
    if (!raffle) return null;
    
    return this.update(id, { 
      ticketsSold: raffle.ticketsSold + count 
    });
  }

  /**
   * Obtener categorías
   * @returns {Array} Lista de categorías
   */
  static getCategories() {
    return CATEGORIES;
  }
}

module.exports = Raffle;
