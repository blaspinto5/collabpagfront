# 🎰 Sorteando Weas — ¡Tu Suerte es Nuestra Misión!

Plataforma profesional de sorteos con diseño moderno en React + Tailwind CSS, backend Express.js e integración con MercadoPago.

---

## 🚀 Instalación Rápida (Windows)

### Opción 1: Doble clic
```
1. Ir a la carpeta initcase/
2. Doble clic en INSTALAR.bat
3. Doble clic en EJECUTAR.bat
```

### Opción 2: Terminal
```powershell
# Instalar dependencias
cd backend && npm install
cd ../frontend && npm install

# Ejecutar (2 terminales)
cd backend && npm run dev      # Terminal 1
cd frontend && npm run dev     # Terminal 2
```

---

## 🔗 URLs

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3001/api |

---

## 📁 Estructura del Proyecto

```
proyecto/
├── frontend/          # React + Vite + TailwindCSS
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   │   └── sections/  # Secciones de página
│   │   ├── pages/         # Páginas de la app
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── layouts/       # Layouts
│   │   └── routes/        # Configuración de rutas
│   └── public/            # Assets estáticos
│
├── backend/           # Express.js API
│   ├── src/
│   │   ├── controllers/   # Controladores
│   │   ├── services/      # Lógica de negocio
│   │   ├── routes/        # Rutas API
│   │   └── middleware/    # Middlewares
│   └── data/              # Datos JSON
│
├── initcase/          # Scripts de instalación
│   ├── INSTALAR.bat       # Instala dependencias
│   ├── EJECUTAR.bat       # Inicia servidores
│   └── stop.ps1           # Detiene servidores
│
└── .env               # Variables de entorno
```

---

## 🛠 Stack Tecnológico

| Frontend | Backend | Pagos |
|:--------:|:-------:|:-----:|
| React 19 | Express.js | MercadoPago |
| Vite 7 | Node.js | SDK MP |
| TailwindCSS 4 | - | - |
| Swiper | - | - |
| Lucide React | - | - |

---

## ⚙️ Configuración

### Variables de entorno
```bash
cp .env.example .env
# Editar .env con credenciales de MercadoPago
```

---

**Hecho con ❤️ en Chile 🇨🇱**

