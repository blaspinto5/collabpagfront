require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
let PrismaMariaDb;
try {
  PrismaMariaDb = require('@prisma/adapter-mariadb').PrismaMariaDb;
} catch (err) {
  // adapter not installed
  throw new Error('Missing @prisma/adapter-mariadb. Run: npm install @prisma/adapter-mariadb');
}

const host = process.env.DATABASE_HOST || 'localhost';
const port = process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306;
const user = process.env.DATABASE_USER || 'admin';
const password = process.env.DATABASE_PASSWORD || '';
const database = process.env.DATABASE_NAME || '';

const adapter = new PrismaMariaDb({ host, user, password, database, port, connectionLimit: 5 });

let prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({ adapter });
  }
  prisma = global.prisma;
}

module.exports = prisma;
