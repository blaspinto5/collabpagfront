/**
 * Configuración de MercadoPago
 * @module config/mercadopago
 */

const { MercadoPagoConfig, Preference } = require('mercadopago');
const config = require('./index');

// Inicializar cliente de MercadoPago
const client = new MercadoPagoConfig({ 
  accessToken: config.mercadopago.accessToken
});

// Crear instancia de Preference
const preference = new Preference(client);

module.exports = {
  client,
  preference,
  Preference
};
