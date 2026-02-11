/**
 * Sorteando Weas - Backend API Server
 * @description Express server with modular architecture
 * @version 2.0.0
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const config = require('./src/config');
const apiRoutes = require('./src/routes/api');
const { notFound, errorHandler } = require('./src/middleware/errorHandler');

const app = express();

// Security middleware - allow external images
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "blob:", "https:", "http:"],
      connectSrc: ["'self'", "https:", "http:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration
app.use(cors({
  origin: true,
  credentials: true
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', apiRoutes);

// Serve frontend in production
const publicPath = path.join(__dirname, 'public');
const fs = require('fs');
if (fs.existsSync(path.join(publicPath, 'index.html'))) {
  console.log('📦 Serving static files from /public');
  app.use(express.static(publicPath));
  
  // Handle SPA routing - send all non-API requests to index.html
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path === '/health') {
      return next();
    }
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║      🎰 SORTEANDO WEAS - API SERVER 🎰             ║
╠════════════════════════════════════════════════════╣
║  🌐 URL: http://localhost:${PORT}                       ║
║  📁 Environment: ${config.nodeEnv.padEnd(25)}      ║
║  💳 MercadoPago: ${config.mercadopago.accessToken ? 'Configured' : 'Not configured'}                ║
╠════════════════════════════════════════════════════╣
║  API Endpoints:                                    ║
║  • GET  /api/raffles                               ║
║  • GET  /api/categories                            ║
║  • GET  /api/stats                                 ║
║  • POST /api/payments/create-preference            ║
╚════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
