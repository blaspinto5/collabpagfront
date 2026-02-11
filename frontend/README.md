<div align="center">

# 🎰 Sorteando Weas

### La plataforma de sorteos más confiable de Chile

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br />

<img src="public/logo.png" alt="Sorteando Weas Logo" width="180" />

<br />

**Participa en sorteos exclusivos y gana premios increíbles**

[Demo en Vivo](https://sorteandoweas.cl) · [Reportar Bug](https://github.com/blaspinto5/collabpagfront/issues) · [Solicitar Feature](https://github.com/blaspinto5/collabpagfront/issues)

</div>

---

## ✨ Características

<table>
<tr>
<td>

🎯 **Catálogo de Sorteos**
- Grid responsive con filtros
- Búsqueda en tiempo real
- Indicadores de popularidad

</td>
<td>

💳 **Pagos Seguros**
- Integración MercadoPago
- Confirmación instantánea
- Historial de compras

</td>
<td>

📱 **Diseño Premium**
- Mobile-first responsive
- Dark mode elegante
- Animaciones fluidas

</td>
</tr>
</table>

---

## 🛠️ Stack Tecnológico

<div align="center">

| Frontend | Estilos | Herramientas |
|:--------:|:-------:|:------------:|
| React 19 | TailwindCSS 4 | Vite 7 |

</div>

### Dependencias Principales

```
react@19.2.0          # Framework UI
react-router-dom@7.13 # Enrutamiento SPA
tailwindcss@4.1       # Estilos utility-first
swiper@12.1           # Carrusel premium
lucide-react@0.563    # Iconos modernos
```

---

## 📁 Estructura del Proyecto

```
frontend/
├── 📂 public/                 # Archivos estáticos
│   ├── logo.png
│   └── hero-bg.jpg
│
├── 📂 src/
│   ├── 📂 components/         # Componentes reutilizables
│   │   ├── 📂 sections/       # Secciones de página
│   │   │   ├── HeroCarousel.jsx
│   │   │   ├── StatsSection.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   └── FeaturedRaffles.jsx
│   │   │
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── RaffleCard.jsx
│   │   ├── PurchaseForm.jsx
│   │   └── Loading.jsx
│   │
│   ├── 📂 hooks/              # Custom hooks
│   │   ├── useRaffles.js
│   │   └── usePurchases.js
│   │
│   ├── 📂 layouts/            # Layouts de página
│   │   └── MainLayout.jsx
│   │
│   ├── 📂 pages/              # Páginas/Vistas
│   │   ├── HomePage.jsx
│   │   ├── RafflesPage.jsx
│   │   ├── RaffleDetailPage.jsx
│   │   ├── AdminPage.jsx
│   │   └── Payment*.jsx
│   │
│   ├── 📂 services/           # Servicios API
│   │   ├── api.js
│   │   ├── raffleService.js
│   │   ├── purchaseService.js
│   │   └── paymentService.js
│   │
│   ├── 📂 routes/             # Configuración de rutas
│   │   └── index.jsx
│   │
│   ├── App.jsx                # Componente raíz
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales + tema
│
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o pnpm
- Backend corriendo en puerto 3001

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/blaspinto5/collabpagfront.git

# 2. Entrar al directorio
cd collabpagfront

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir en navegador
# http://localhost:5173
```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run preview` | Previsualiza build local |
| `npm run lint` | Ejecuta ESLint |

---

## 🎨 Paleta de Colores

<div align="center">

| Color | Hex | Uso |
|:-----:|:---:|:---:|
| ⬛ | `#020617` | Background principal |
| 🔵 | `#0f172a` | Background secundario |
| 🟡 | `#FFD700` | Dorado / Acento primario |
| 🔷 | `#00BFFF` | Cian / Acento secundario |
| ⬜ | `#e2e8f0` | Texto principal |

</div>

---

## 📱 Páginas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Carrusel de sorteos, estadísticas, pasos |
| `/sorteos` | Catálogo | Lista de sorteos con filtros |
| `/sorteo/:id` | Detalle | Info completa + compra de boletos |
| `/admin` | Admin | Dashboard de administración |
| `/payment/*` | Pagos | Resultado de transacciones |

---

## 🔌 API Endpoints

El frontend consume la API del backend en `http://localhost:3001/api`:

```
GET    /api/raffles          # Lista sorteos
GET    /api/raffles/:id      # Obtiene sorteo
GET    /api/categories       # Lista categorías
POST   /api/raffles          # Crea sorteo (admin)
PUT    /api/raffles/:id      # Actualiza sorteo (admin)
DELETE /api/raffles/:id      # Elimina sorteo (admin)

GET    /api/purchases        # Lista compras (admin)
POST   /api/purchases/:id/confirm  # Confirma pago
GET    /api/purchases/stats  # Estadísticas

POST   /api/payments/create-preference  # MercadoPago
```

---

## 🧩 Componentes Principales

### `<HeroCarousel />`
Carrusel premium con Swiper.js para mostrar sorteos destacados.

```jsx
<HeroCarousel raffles={raffles} loading={loading} />
```

### `<RaffleCard />`
Tarjeta de sorteo con imagen, precio, progreso de ventas.

```jsx
<RaffleCard raffle={{
  id: 1,
  title: "iPhone 15 Pro",
  ticketPrice: 2990,
  ticketsSold: 45,
  totalTickets: 100,
  image: "url...",
  endDate: "2026-03-15"
}} />
```

### `<PurchaseForm />`
Formulario de compra integrado con MercadoPago.

```jsx
<PurchaseForm 
  raffle={raffle} 
  onSuccess={() => console.log('¡Compra exitosa!')} 
/>
```

---

## 🪝 Custom Hooks

```jsx
// Obtener todos los sorteos activos
const { raffles, loading, error } = useRaffles({ status: 'active' });

// Obtener un sorteo específico
const { raffle, loading, error } = useRaffle(id);

// Obtener categorías
const { categories } = useCategories();

// Estadísticas (admin)
const { stats, loading } = useStats();
```

---

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

---

## 👥 Equipo

<div align="center">

| Desarrollador |
|:-------------:|
| **Blas Pinto** |
| [@blaspinto5](https://github.com/blaspinto5) |

</div>

---

<div align="center">

**Hecho con ❤️ en Chile 🇨🇱**

⭐ Si te gusta el proyecto, ¡dale una estrella!

</div>
