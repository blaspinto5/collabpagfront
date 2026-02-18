/**
 * Configuración de MercadoPago
 * @module config/mercadopago
 */

const { MercadoPagoConfig, Preference } = require('mercadopago');
const config = require('./index');

// Do not initialize SDK when payments disabled in config
let client = null;
let preference = null;

if (!config.paymentsEnabled) {
  console.warn('Payments disabled (PAYMENTS_ENABLED=false) — MercadoPago client not initialized');
} else {
  if (!config.mercadopago.accessToken) {
    console.warn('Warning: MP_ACCESS_TOKEN is not set — MercadoPago will not be functional');
  } else {
    client = new MercadoPagoConfig({ accessToken: config.mercadopago.accessToken });
    preference = new Preference(client);
  }
}

module.exports = {
  client,
  preference,
  Preference
};
