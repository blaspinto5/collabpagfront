const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
// const sequelize = require('./src/config/database');
const apiRoutes = require('./src/routes/api');
const { notFound, errorHandler } = require('./src/middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

function safeLog(...args) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...args);
  }
}

process.on('unhandledRejection', (err) => {
  safeLog('UNHANDLED REJECTION!', err);
  process.exit(1);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on port ${PORT}`);
  }
});
