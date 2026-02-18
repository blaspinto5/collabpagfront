/**
 * Application Configuration
 * @module config
 */

require('dotenv').config();

const config = {
  // Server
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  
  // MercadoPago
  mercadopago: {
    accessToken: process.env.MP_ACCESS_TOKEN || '',
    sandbox: process.env.MP_SANDBOX === 'true'
  },
  // Payments feature flag (disable MercadoPago in dev)
  paymentsEnabled: process.env.PAYMENTS_ENABLED === 'true',
  
  // URLs
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  backendUrl: process.env.BACKEND_URL || 'http://localhost:3001',
  
  // Data paths
  dataPath: {
    raffles: './data/raffles.json',
    purchases: './data/purchases.json'
  }
};

module.exports = config;
