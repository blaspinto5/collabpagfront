# 🎰 Sorteando Weas

<div align="center">

![Sorteando Weas Logo](https://img.shields.io/badge/Sorteando-Weas-FFD700?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI0ZGRDcwMCIgZD0iTTEyIDJMMyA3djEwbDkgNSA5LTV2LTEwTDEyIDJ6Ii8+PC9zdmc+)

**Plataforma de Sorteos Online** | **Chile 🇨🇱**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MercadoPago](https://img.shields.io/badge/MercadoPago-2.0.6-00B1EA?style=flat-square)](https://www.mercadopago.cl/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)

---

[Características](#-características) •
[Instalación](#-instalación-rápida) •
[Arquitectura](#-arquitectura-del-proyecto) •
[API](#-documentación-api) •
[Componentes](#-frontend---documentación-técnica)

</div>

---

## 📖 Tabla de Contenidos

1. [Descripción General](#-descripción-general)
2. [Características](#-características)
3. [Stack Tecnológico](#-stack-tecnológico)
4. [Instalación Rápida](#-instalación-rápida)
5. [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
6. [Backend - Documentación Técnica](#-backend---documentación-técnica)
7. [Frontend - Documentación Técnica](#-frontend---documentación-técnica)
8. [Sistema de Estilos](#-sistema-de-estilos)
9. [API REST - Endpoints](#-documentación-api)
10. [Flujos de Usuario](#-flujos-de-usuario)
11. [Configuración Avanzada](#-configuración-avanzada)
12. [Troubleshooting](#-troubleshooting)

---

## 📋 Descripción General

**Sorteando Weas** es una plataforma web moderna de sorteos online diseñada específicamente para el mercado chileno. Permite a los usuarios participar en sorteos comprando boletos de forma segura a través de MercadoPago, con un diseño premium inspirado en Apple y Tesla.

### Objetivos del Proyecto

- ✅ Plataforma intuitiva y fácil de usar
- ✅ Pagos seguros con MercadoPago
- ✅ Diseño premium dark mode
- ✅ Panel de administración integrado
- ✅ Responsive para todos los dispositivos
- ✅ Arquitectura escalable y mantenible

---

## ✨ Características

### Para Usuarios
| Característica | Descripción |
|---------------|-------------|
| 🎯 **Catálogo de Sorteos** | Navega por sorteos activos con filtros por categoría |
| 🎫 **Compra de Boletos** | Compra hasta 10 boletos por transacción |
| 💳 **Pago Seguro** | Integración completa con MercadoPago Chile |
| 📧 **Notificaciones** | Confirmación por email con números de boleto |
| 📱 **Responsive** | Experiencia optimizada en móvil, tablet y desktop |

### Para Administradores
| Característica | Descripción |
|---------------|-------------|
| 📊 **Dashboard** | Estadísticas en tiempo real |
| 📋 **Gestión de Compras** | Confirmar/rechazar compras pendientes |
| 🎰 **Gestión de Sorteos** | Crear, editar y eliminar sorteos |
| 💰 **Reportes** | Ingresos, boletos vendidos, participantes |

---

## 🛠 Stack Tecnológico

### Frontend
```
├── React 19.2.0          → Biblioteca UI con hooks
├── Vite 7.3.1            → Bundler ultrarrápido
├── TailwindCSS 4.1.18    → Framework CSS utility-first
├── React Router 7.13.0   → Enrutamiento SPA
├── Swiper 12.1.0         → Carruseles touch-friendly
└── Lucide React 0.563    → Iconografía SVG
```

### Backend
```
├── Express 4.18.2        → Framework HTTP Node.js
├── MercadoPago SDK 2.0.6 → Integración de pagos
├── Helmet 7.1.0          → Seguridad HTTP headers
├── CORS 2.8.5            → Control de origen cruzado
├── dotenv 16.3.1         → Variables de entorno
└── Nodemon 3.0.2         → Hot reload desarrollo
```

### Base de Datos
```
└── JSON Files            → Persistencia basada en archivos
    ├── raffles.json      → Datos de sorteos
    └── purchases.json    → Registro de compras
```

---

## 🚀 Instalación Rápida

### Prerrequisitos

- **Node.js** v18.0.0 o superior
- **Git** para clonar el repositorio
- **Cuenta MercadoPago** (opcional para desarrollo)

### Opción 1: Scripts Automatizados (Windows)

```powershell
# 1. Clonar repositorio
git clone https://github.com/blaspinto5/collabpagfront.git
cd collabpagfront

# 2. Instalar dependencias (doble clic en INSTALAR.bat)
.\initcase\INSTALAR.bat

# 3. Ejecutar proyecto (doble clic en EJECUTAR.bat)
.\initcase\EJECUTAR.bat
```

### Opción 2: Instalación Manual

```bash
# Clonar repositorio
git clone https://github.com/blaspinto5/collabpagfront.git
cd collabpagfront

# Instalar backend
cd backend
npm install

# Instalar frontend
cd ../frontend
npm install

# Ejecutar (2 terminales)
# Terminal 1 - Backend:
cd backend && npm run dev

# Terminal 2 - Frontend:
cd frontend && npm run dev
```

### URLs de Desarrollo

| Servicio | URL | Puerto |
|----------|-----|--------|
| 🌐 Frontend | http://localhost:5173 | 5173 |
| 🔌 Backend API | http://localhost:3001/api | 3001 |
| ❤️ Health Check | http://localhost:3001/health | 3001 |

---

## 📁 Arquitectura del Proyecto

```
proyecto/
│
├── 📂 frontend/                    # Aplicación React
│   ├── 📂 public/                  # Assets estáticos
│   ├── 📂 src/
│   │   ├── 📂 components/          # Componentes reutilizables
│   │   │   ├── 📂 sections/        # Secciones de página
│   │   │   ├── Footer.jsx          # Pie de página
│   │   │   ├── Loading.jsx         # Estados de carga
│   │   │   ├── Navbar.jsx          # Navegación principal
│   │   │   ├── PurchaseForm.jsx    # Formulario de compra
│   │   │   ├── RaffleCard.jsx      # Tarjeta de sorteo
│   │   │   ├── StatsDashboard.jsx  # Panel de estadísticas
│   │   │   └── index.js            # Barrel exports
│   │   ├── 📂 hooks/               # Custom React hooks
│   │   ├── 📂 layouts/             # Layouts de página
│   │   ├── 📂 pages/               # Páginas/Vistas
│   │   ├── 📂 routes/              # Configuración de rutas
│   │   ├── 📂 services/            # Servicios API
│   │   ├── App.jsx                 # Componente raíz
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Estilos globales
│   ├── index.html                  # HTML template
│   ├── vite.config.js              # Configuración Vite
│   └── package.json                # Dependencias frontend
│
├── 📂 backend/                     # API Express
│   ├── 📂 data/                    # Archivos JSON (DB)
│   │   ├── raffles.json            # Datos de sorteos
│   │   └── purchases.json          # Datos de compras
│   ├── 📂 src/
│   │   ├── 📂 config/              # Configuración
│   │   │   ├── index.js            # Variables centralizadas
│   │   │   └── mercadopago.js      # Config MercadoPago
│   │   ├── 📂 controllers/         # Handlers HTTP
│   │   │   ├── paymentController.js
│   │   │   ├── purchaseController.js
│   │   │   └── raffleController.js
│   │   ├── 📂 middleware/          # Middlewares
│   │   │   ├── errorHandler.js     # Manejo de errores
│   │   │   └── validator.js        # Validaciones
│   │   ├── 📂 models/              # Modelos de datos
│   │   │   ├── Purchase.js         # Modelo Compra
│   │   │   └── Raffle.js           # Modelo Sorteo
│   │   ├── 📂 routes/              # Definición de rutas
│   │   │   └── 📂 api/
│   │   │       ├── index.js        # Router principal
│   │   │       ├── payments.js     # Rutas de pagos
│   │   │       ├── purchases.js    # Rutas de compras
│   │   │       └── raffles.js      # Rutas de sorteos
│   │   └── 📂 services/            # Lógica de negocio
│   │       ├── index.js
│   │       ├── paymentService.js
│   │       ├── purchaseService.js
│   │       └── raffleService.js
│   ├── server.js                   # Entry point servidor
│   └── package.json                # Dependencias backend
│
├── 📂 initcase/                    # Scripts de automatización
│   ├── INSTALAR.bat                # Instalador Windows
│   ├── EJECUTAR.bat                # Ejecutor Windows
│   ├── install.ps1                 # Script PowerShell instalación
│   ├── run.ps1                     # Script PowerShell ejecución
│   └── stop.ps1                    # Detener servidores
│
├── .env                            # Variables de entorno
├── .env.example                    # Plantilla de variables
├── .gitignore                      # Archivos ignorados por Git
└── README.md                       # Este archivo
```

---

## ⚙️ Backend - Documentación Técnica

### Arquitectura MVC + Services

El backend sigue una arquitectura en capas para separar responsabilidades:

```
Cliente HTTP
     ↓
[Routes] → Define endpoints y métodos HTTP
     ↓
[Controllers] → Maneja request/response
     ↓
[Services] → Lógica de negocio
     ↓
[Models] → Acceso a datos (JSON files)
```

### 📂 Configuración (`/src/config/`)

#### `index.js` - Configuración Central
```javascript
module.exports = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  mercadopago: {
    accessToken: process.env.MP_ACCESS_TOKEN || '',
    sandbox: process.env.MP_SANDBOX === 'true'
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  backendUrl: process.env.BACKEND_URL || 'http://localhost:3001'
};
```

**Propósito**: Centraliza todas las variables de configuración cargadas desde `.env`.

#### `mercadopago.js` - Cliente MercadoPago
```javascript
const { MercadoPagoConfig, Preference } = require('mercadopago');
const client = new MercadoPagoConfig({ accessToken: config.mercadopago.accessToken });
```

**Propósito**: Inicializa el SDK de MercadoPago con las credenciales configuradas.

---

### 📂 Controladores (`/src/controllers/`)

Los controladores actúan como intermediarios entre las rutas HTTP y los servicios de negocio.

#### `raffleController.js`

| Método | Descripción | Ruta |
|--------|-------------|------|
| `getAll` | Obtiene todos los sorteos con filtros opcionales | GET `/api/raffles` |
| `getById` | Obtiene un sorteo por ID | GET `/api/raffles/:id` |
| `create` | Crea un nuevo sorteo | POST `/api/raffles` |
| `update` | Actualiza un sorteo existente | PUT `/api/raffles/:id` |
| `remove` | Elimina un sorteo | DELETE `/api/raffles/:id` |
| `getCategories` | Obtiene categorías disponibles | GET `/api/categories` |

#### `purchaseController.js`

| Método | Descripción | Ruta |
|--------|-------------|------|
| `getAll` | Lista todas las compras | GET `/api/purchases` |
| `getById` | Obtiene compra por ID | GET `/api/purchases/:id` |
| `confirm` | Confirma compra y asigna boletos | POST `/api/purchases/:id/confirm` |
| `getStats` | Estadísticas generales | GET `/api/stats` |

#### `paymentController.js`

| Método | Descripción | Ruta |
|--------|-------------|------|
| `createPreference` | Crea preferencia de pago MP | POST `/api/payments/create-preference` |
| `webhook` | Recibe notificaciones MP | POST `/api/payments/webhook` |

---

### 📂 Servicios (`/src/services/`)

Los servicios encapsulan toda la lógica de negocio, manteniendo los controladores delgados.

#### `raffleService.js` - Funciones Principales

```javascript
// Obtener sorteos con filtros
getAllRaffles({ category, status }) → Array<Raffle>

// Obtener sorteo específico
getRaffleById(id) → Raffle | Error(404)

// Crear nuevo sorteo
createRaffle(data) → Raffle

// Actualizar sorteo
updateRaffle(id, data) → Raffle | Error(404)

// Eliminar sorteo
deleteRaffle(id) → boolean

// Obtener categorías
getCategories() → Array<Category>

// Incrementar boletos vendidos
incrementTicketsSold(id, count) → Raffle
```

#### `purchaseService.js` - Funciones Principales

```javascript
// Listar compras
getAllPurchases(filters) → Array<Purchase>

// Obtener por ID
getPurchaseById(id) → Purchase | Error(404)

// Crear compra pendiente
createPurchase(data) → Purchase

// Confirmar compra y asignar números
confirmPurchase(purchaseId) → { purchase, ticketNumbers }

// Obtener estadísticas
getStats() → {
  activeRaffles, totalRaffles, totalTicketsSold,
  totalRevenue, totalParticipants, confirmedPurchases,
  pendingPurchases
}
```

#### `paymentService.js` - Integración MercadoPago

```javascript
// Crear preferencia de pago
createPaymentPreference({
  raffleId, ticketCount, buyerName, buyerEmail, buyerPhone
}) → {
  preferenceId,    // ID de preferencia MP
  initPoint,       // URL para pago producción
  sandboxInitPoint,// URL para pago sandbox
  purchaseId,      // ID de compra creada
  total            // Monto total
}

// Procesar webhook
processWebhook(notification) → { processed, type, id }
```

---

### 📂 Modelos (`/src/models/`)

Los modelos manejan la persistencia de datos en archivos JSON.

#### `Raffle.js` - Modelo de Sorteo

**Estructura de datos:**
```javascript
{
  id: number,              // ID único
  title: string,           // Título del sorteo
  description: string,     // Descripción completa
  prize: string,           // Nombre del premio
  prizeValue: number,      // Valor en CLP
  image: string,           // URL de imagen
  ticketPrice: number,     // Precio por boleto (CLP)
  totalTickets: number,    // Total de boletos disponibles
  ticketsSold: number,     // Boletos vendidos
  drawDate: string,        // Fecha del sorteo (ISO 8601)
  status: 'active'|'completed'|'cancelled',
  category: string,        // Categoría del premio
  winners: number,         // Cantidad de ganadores
  createdAt: number        // Timestamp de creación
}
```

**Métodos estáticos:**
- `getAll(filters)` - Obtener todos con filtros
- `getById(id)` - Obtener por ID
- `create(data)` - Crear nuevo
- `update(id, data)` - Actualizar existente
- `delete(id)` - Eliminar
- `getCategories()` - Listar categorías
- `incrementTicketsSold(id, count)` - Sumar boletos vendidos

#### `Purchase.js` - Modelo de Compra

**Estructura de datos:**
```javascript
{
  id: number,              // ID único
  preferenceId: string,    // ID de preferencia MercadoPago
  raffleId: number,        // ID del sorteo
  raffleName: string,      // Nombre del sorteo
  buyerName: string,       // Nombre del comprador
  buyerEmail: string,      // Email del comprador
  buyerPhone: string,      // Teléfono (opcional)
  ticketCount: number,     // Cantidad de boletos
  ticketPrice: number,     // Precio unitario
  total: number,           // Total pagado
  status: 'pending'|'confirmed'|'cancelled',
  ticketNumbers: number[], // Números asignados
  createdAt: number,       // Timestamp creación
  confirmedAt: number      // Timestamp confirmación
}
```

**Métodos estáticos:**
- `getAll(filters)` - Listar con filtros
- `getById(id)` - Obtener por ID
- `getByPreferenceId(preferenceId)` - Buscar por pref. MP
- `create(data)` - Crear nueva compra
- `update(id, data)` - Actualizar
- `confirm(id, ticketNumbers)` - Confirmar y asignar números
- `getStats()` - Estadísticas agregadas

---

### 📂 Middleware (`/src/middleware/`)

#### `errorHandler.js`

```javascript
// 404 - Ruta no encontrada
const notFound = (req, res, next) => {
  const error = new Error(`No encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error general - Logging y respuesta
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
```

---

### 📂 Rutas (`/src/routes/api/`)

#### `index.js` - Router Principal
```javascript
router.use('/raffles', raffleRoutes);
router.use('/purchases', purchaseRoutes);
router.use('/payments', paymentRoutes);
router.get('/stats', purchaseController.getStats);
router.get('/categories', raffleController.getCategories);
```

#### Endpoints Completos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/raffles` | Lista sorteos (filtra `?category=&status=`) |
| GET | `/api/raffles/:id` | Detalle de sorteo |
| POST | `/api/raffles` | Crear sorteo |
| PUT | `/api/raffles/:id` | Actualizar sorteo |
| DELETE | `/api/raffles/:id` | Eliminar sorteo |
| GET | `/api/categories` | Lista categorías |
| GET | `/api/purchases` | Lista compras |
| GET | `/api/purchases/:id` | Detalle compra |
| POST | `/api/purchases/:id/confirm` | Confirmar compra |
| GET | `/api/stats` | Estadísticas generales |
| POST | `/api/payments/create-preference` | Crear preferencia MP |
| POST | `/api/payments/webhook` | Webhook MP |
| GET | `/health` | Health check |

---

## 🎨 Frontend - Documentación Técnica

### Arquitectura de Componentes

```
App.jsx
    └── RouterProvider (react-router-dom)
            └── MainLayout
                    ├── Navbar
                    ├── <Outlet /> ← Páginas
                    └── Footer
```

### 📂 Páginas (`/src/pages/`)

| Página | Ruta | Descripción |
|--------|------|-------------|
| `HomePage` | `/` | Carrusel + Stats + HowItWorks |
| `RafflesPage` | `/sorteos` | Catálogo con filtros |
| `RaffleDetailPage` | `/sorteo/:id` | Detalle + formulario compra |
| `AdminPage` | `/admin` | Dashboard admin |
| `PaymentSuccessPage` | `/payment/success` | Pago exitoso |
| `PaymentFailurePage` | `/payment/failure` | Pago rechazado |
| `PaymentPendingPage` | `/payment/pending` | Pago pendiente |
| `NotFoundPage` | `*` | Error 404 |

---

### 📂 Componentes (`/src/components/`)

| Componente | Descripción |
|------------|-------------|
| `Navbar` | Navegación sticky con logo y links |
| `Footer` | Pie con info de contacto y links |
| `RaffleCard` | Tarjeta de sorteo para grids |
| `PurchaseForm` | Formulario compra con contador |
| `Loading` | Spinners y skeletons |
| `StatsDashboard` | Métricas admin |

### 📂 Secciones (`/src/components/sections/`)

| Sección | Descripción |
|---------|-------------|
| `HeroCarousel` | Carrusel principal Swiper |
| `HeroSection` | Hero con background y CTAs |
| `FeaturedRaffles` | Sorteos destacados |
| `HowItWorks` | 3 pasos para participar |
| `StatsSection` | Métricas de confianza |

---

### 📂 Hooks (`/src/hooks/`)

```javascript
// Sorteos
useRaffles(filters)  → { raffles, loading, error, refetch }
useRaffle(id)        → { raffle, loading, error, refetch }
useCategories()      → { categories, loading, error }

// Compras
usePurchases(filters) → { purchases, loading, error, refetch, confirmPurchase }
useStats()            → { stats, loading, error, refetch }
```

---

### 📂 Servicios (`/src/services/`)

```javascript
// API base
apiFetch(endpoint, options) → Promise<JSON>

// Sorteos
raffleService.getAll(filters)
raffleService.getById(id)
raffleService.getCategories()

// Compras
purchaseService.getAll(filters)
purchaseService.confirm(id)
purchaseService.getStats()

// Pagos
paymentService.createPreference(data)
```

---

## 🎨 Sistema de Estilos

### Variables CSS

```css
:root {
  --color-primary: #0a1628;       /* Fondo principal */
  --color-primary-light: #0f2847; /* Fondo claro */
  --color-primary-dark: #020617;  /* Fondo oscuro */
  --color-gold: #FFD700;          /* Acento principal */
  --color-cyan: #00BFFF;          /* Acento secundario */
}
```

### Clases Utilitarias

| Clase | Descripción |
|-------|-------------|
| `.app-background` | Gradiente de fondo principal |
| `.glass` | Efecto glassmorphism |
| `.gradient-text` | Texto con gradiente gold-cyan |
| `.btn-primary` | Botón dorado con hover |
| `.btn-secondary` | Botón outline dorado |
| `.input-field` | Input estilizado dark |

---

## 📚 Documentación API

### Ejemplos de Uso

#### Obtener Sorteos Activos
```bash
curl http://localhost:3001/api/raffles?status=active
```

#### Crear Preferencia de Pago
```bash
curl -X POST http://localhost:3001/api/payments/create-preference \
  -H "Content-Type: application/json" \
  -d '{
    "raffleId": 1,
    "ticketCount": 2,
    "buyerName": "Juan Pérez",
    "buyerEmail": "juan@email.com"
  }'
```

#### Confirmar Compra
```bash
curl -X POST http://localhost:3001/api/purchases/1/confirm
```

---

## 🔄 Flujos de Usuario

### Flujo de Compra

```
Usuario → Selecciona sorteo → Completa formulario
    → Sistema crea preferencia MP y compra pending
    → Redirect a MercadoPago
    → Pago exitoso/fallido → Redirect a página correspondiente
```

### Flujo Admin

```
Admin → /admin → Ve dashboard con stats
    → Lista compras pendientes
    → Click "Confirmar" → Sistema asigna números
    → Actualiza ticketsSold del sorteo
```

---

## ⚙️ Configuración Avanzada

### Variables de Entorno

```env
# MercadoPago
MP_ACCESS_TOKEN=your_access_token_here
MP_SANDBOX=true

# Servidor
PORT=3001
NODE_ENV=development

# URLs
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:5173
```

---

## 🔧 Troubleshooting

### Errores Comunes

| Error | Solución |
|-------|----------|
| `EADDRINUSE` | `Get-Process node \| Stop-Process -Force` |
| `Cannot find module` | `rm -rf node_modules && npm install` |
| `CORS error` | Verificar `CORS_ORIGIN` en `.env` |

### Scripts de Utilidad

```powershell
# Detener servidores
.\initcase\stop.ps1

# Ver puertos en uso
Get-NetTCPConnection -State Listen | Where-Object {$_.LocalPort -in 3001,5173}
```

---

## 📄 Licencia

ISC © Sorteando Weas

---

<div align="center">

**Hecho con ❤️ en Chile 🇨🇱**

[![GitHub](https://img.shields.io/badge/GitHub-blaspinto5-181717?style=flat-square&logo=github)](https://github.com/blaspinto5)

</div>

