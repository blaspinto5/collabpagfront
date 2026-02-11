/**
 * Modelo de Compra/Ticket
 * Maneja la persistencia de compras en archivo JSON
 * @module models/Purchase
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/purchases.json');

/**
 * Asegura que el archivo de datos existe
 */
const ensureDataFile = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
};

class Purchase {
  /**
   * Obtener todas las compras
   * @param {Object} filters - Filtros opcionales
   * @returns {Array} Lista de compras
   */
  static getAll(filters = {}) {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    let purchases = [...data];

    if (filters.raffleId) {
      purchases = purchases.filter(p => p.raffleId === parseInt(filters.raffleId));
    }
    if (filters.status) {
      purchases = purchases.filter(p => p.status === filters.status);
    }

    // Ordenar por fecha más reciente
    purchases.sort((a, b) => b.createdAt - a.createdAt);

    return purchases;
  }

  /**
   * Obtener compra por ID
   * @param {number} id - ID de la compra
   * @returns {Object|null} Compra encontrada o null
   */
  static getById(id) {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return data.find(p => p.id === parseInt(id)) || null;
  }

  /**
   * Obtener compra por preference ID de MercadoPago
   * @param {string} preferenceId - ID de preferencia
   * @returns {Object|null} Compra encontrada o null
   */
  static getByPreferenceId(preferenceId) {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return data.find(p => p.preferenceId === preferenceId) || null;
  }

  /**
   * Crear nueva compra
   * @param {Object} purchaseData - Datos de la compra
   * @returns {Object} Compra creada
   */
  static create(purchaseData) {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    
    const newPurchase = {
      id: data.length > 0 ? Math.max(...data.map(p => p.id)) + 1 : 1,
      preferenceId: purchaseData.preferenceId,
      raffleId: purchaseData.raffleId,
      raffleName: purchaseData.raffleName,
      buyerName: purchaseData.buyerName,
      buyerEmail: purchaseData.buyerEmail,
      buyerPhone: purchaseData.buyerPhone || '',
      ticketCount: purchaseData.ticketCount,
      ticketPrice: purchaseData.ticketPrice,
      total: purchaseData.total,
      status: 'pending',
      ticketNumbers: [],
      createdAt: Date.now()
    };

    data.push(newPurchase);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    
    return newPurchase;
  }

  /**
   * Actualizar compra
   * @param {number} id - ID de la compra
   * @param {Object} updates - Datos a actualizar
   * @returns {Object|null} Compra actualizada o null
   */
  static update(id, updates) {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const index = data.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) return null;

    data[index] = { ...data[index], ...updates };
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    
    return data[index];
  }

  /**
   * Confirmar compra y asignar números de boletos
   * @param {number} id - ID de la compra
   * @param {Array} ticketNumbers - Números de boletos asignados
   * @returns {Object|null} Compra confirmada
   */
  static confirm(id, ticketNumbers) {
    return this.update(id, {
      status: 'confirmed',
      ticketNumbers,
      confirmedAt: Date.now()
    });
  }

  /**
   * Obtener estadísticas
   * @returns {Object} Estadísticas de compras
   */
  static getStats() {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const confirmed = data.filter(p => p.status === 'confirmed');
    
    return {
      totalPurchases: data.length,
      confirmedPurchases: confirmed.length,
      pendingPurchases: data.filter(p => p.status === 'pending').length,
      totalTicketsSold: confirmed.reduce((sum, p) => sum + p.ticketCount, 0),
      totalRevenue: confirmed.reduce((sum, p) => sum + p.total, 0),
      uniqueBuyers: new Set(confirmed.map(p => p.buyerEmail)).size
    };
  }
}

module.exports = Purchase;
