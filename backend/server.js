/**
 * Sorteando Weas - Backend API Server
 * Express server ready for Hostinger Node.js environment
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const cors = require('cors');
require('dotenv').config();
const express = require('express');
const apiRoutes = require('./src/routes/api');
const app = express();

// CORS
app.use(cors({
   origin: process.env.CORS_ORIGIN,
   credentials: true,
}));

// API ROUTES
app.use('/api', apiRoutes);

// SERVER START
const PORT = process.env.PORT;
app.listen(PORT);

module.exports = app;
    timestamp: new Date().toISOString()
  });
});

/* ==============================
   API ROUTES
============================== */
app.use('/api', apiRoutes);

/* ==============================
   ERROR HANDLING
============================== */
app.use(notFound);
app.use(errorHandler);

/* ==============================
   SERVER START
   IMPORTANT FOR HOSTINGER
============================== */
const PORT = process.env.PORT || config.port || 3000;

app.listen(PORT, () => {
  console.log('============================================================');
  console.log('🎰 SORTEANDO WEAS - API SERVER');
  console.log('------------------------------------------------------------');
  console.log(`Running on port: ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`MercadoPago: ${config?.mercadopago?.accessToken ? 'Configured' : 'Not configured'}`);
  console.log('------------------------------------------------------------');
  console.log('Available endpoints:');
  console.log('GET    /health');
  console.log('GET    /api/raffles');
  console.log('GET    /api/categories');
  console.log('GET    /api/stats');
  console.log('POST   /api/payments/create-preference');
  console.log('============================================================');
});

module.exports = app;
