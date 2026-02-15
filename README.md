
# 🎰 Sorteando Weas — Plataforma de Sorteos Profesional

**Monorepo fullstack para sorteos online con pagos reales.**

---

## 🏗️ Estructura del Proyecto

```
proyecto/
├── frontend/          # React + Vite SPA (para www)
│   ├── src/
│   ├── public/
│   ├── dist/          # Build final para Hostinger (subir a www)
│   └── .env.production
├── backend/           # Node.js 20 + Express (para subdominio api)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/        # Sequelize models (MariaDB)
│   │   ├── routes/
│   │   ├── config/
│   │   └── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env.production
├── initcase/          # Scripts de instalación/desarrollo
│   ├── INSTALAR.bat
│   ├── EJECUTAR.bat
│   └── stop.ps1
└── README.md
```

---

## 🛡️ Seguridad y Producción

- **Backend endurecido para pagos reales:**
	- Persistencia 100% en MariaDB (Sequelize ORM)
	- Sin uso de archivos JSON ni fs
	- Todas las operaciones críticas usan transacciones SQL
	- Validación de inputs en controladores (sin librerías externas)
	- Manejo de errores y códigos HTTP correctos
	- CORS estricta: sólo permite origen definido en `CORS_ORIGIN`
	- Webhook MercadoPago público y funcional
	- Sin logs ni prints en producción
	- Sin devDependencies ni scripts de desarrollo
	- Sin dependencias de cluster, sockets ni workers
	- Sin fallback de puertos ni URLs hardcoded
	- Manejo de promesas no resueltas (unhandledRejection)

---

## ⚙️ Variables de Entorno (Producción)

### Backend (`backend/.env.production`)
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
PORT=3000
CORS_ORIGIN=https://tudominio.com
MERCADOPAGO_ACCESS_TOKEN=tu_token_mp
```

### Frontend (`frontend/.env.production`)
```
VITE_API_URL=https://api.tudominio.com
```

---

## 🏁 Deploy en Hostinger Business Web Hosting

### 1. Backend (Node.js 20, subdominio api)
- Subir carpeta `backend/` al root del subdominio (ej: `api.tudominio.com`)
- Instalar dependencias: `npm install`
- Configurar `.env.production` con credenciales reales
- Asegurarse que el script de inicio sea `node server.js`
- MariaDB debe estar disponible y accesible desde el backend

### 2. Frontend (React SPA, www principal)
- Ejecutar `npm run build` en `frontend/`
- Subir el contenido de `frontend/dist/` al directorio `www` de Hostinger
- Incluir archivo `.htaccess` para fallback SPA:
	```
	RewriteEngine On
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteRule ^ index.html [QSA,L]
	```
- Configurar `VITE_API_URL` en `.env.production` con la URL del backend

### 3. Migración de Datos (si aplica)
- Usar script de migración para importar datos JSON antiguos a MariaDB (no incluido por defecto)

---

## 🔒 Consideraciones de Seguridad y Compatibilidad
- **No exponer variables sensibles en frontend**
- **No usar rutas hardcoded ni fallback a localhost**
- **No exponer endpoints internos ni de administración**
- **No usar sockets, cluster ni workers** (no soportados en Hostinger compartido)
- **No usar devDependencies ni scripts de desarrollo en producción**
- **No dejar prints/logs en producción**

---

## 📦 package.json (Backend)
```json
{
	"name": "sorteando-weas-backend",
	"version": "2.0.0",
	"main": "server.js",
	"scripts": {
		"start": "node server.js"
	},
	"dependencies": {
		"express": "^4.18.2",
		"cors": "^2.8.5",
		"dotenv": "^16.3.1",
		"mercadopago": "^2.0.6",
		"helmet": "^7.1.0",
		"express-validator": "^7.0.1"
	},
	"engines": {
		"node": ">=18.0.0"
	}
}
```

---

## 📦 package.json (Frontend)
```json
{
	"name": "frontend",
	"private": true,
	"version": "0.0.0",
	"type": "module",
	"scripts": {
		"build": "vite build"
	},
	"dependencies": {
		"lucide-react": "^0.563.0",
		"react": "^19.2.0",
		"react-dom": "^19.2.0",
		"react-router-dom": "^7.13.0",
		"swiper": "^12.1.0"
	}
}
```

---

## 🗄️ Configuración Sequelize (backend/src/config/database.js)
```js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'mariadb',
		logging: false,
	}
);
module.exports = sequelize;
```

---

## 🧩 Modelos Sequelize (Ejemplo)
### Raffle
```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Raffle = sequelize.define('Raffle', {
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	title: { type: DataTypes.STRING, allowNull: false },
	... // ver código fuente para todos los campos
}, { tableName: 'raffles', timestamps: true });
module.exports = Raffle;
```
### Purchase
```js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Purchase = sequelize.define('Purchase', {
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	... // ver código fuente para todos los campos
}, { tableName: 'purchases', timestamps: true });
module.exports = Purchase;
```

---

## 🚦 Endurecimiento y Buenas Prácticas
- Todos los controladores usan try/catch y retornan HTTP status correctos
- Transacciones SQL en confirmación de compra y tickets
- Validación básica de inputs
- getStats usa SQL agregada
- sequelize.authenticate() y sequelize.sync() en startup
- Manejo de promesas no resueltas

---

## 📝 Advertencias Hostinger
- **MariaDB debe estar habilitada y accesible**
- **Node.js 20+ requerido para backend**
- **No usar scripts de desarrollo ni devDependencies**
- **No exponer variables sensibles en frontend**
- **SPA requiere .htaccess para fallback**

---

**Hecho con ❤️ en Chile 🇨🇱 — Listo para producción real**

