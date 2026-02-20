<!-- AUTO-GENERATED AUDIT README -->
# 🎰 Sorteando Weas — Auditoría y README operativo

Este documento fue generado a partir del código fuente del repositorio.
Reglas aplicadas: no se inventó información; todo proviene de código/config./archivos. Si no fue posible encontrar un dato, aparece marcado como **NO ENCONTRADO**. Valores sensibles detectados se reemplazaron por `***REDACTED***` y se documenta el nombre de la variable.

---

**Contenido entregado en este archivo:**

- A) Inventario del proyecto (estructura, stack, dependencias, rutas, modelos, configuración)
- B) Auditoría priorizada (problemas detectados, causa, impacto, sugerencias con referencias)
- C) README operativo (instrucciones completas para levantar FE y BE, variables, scripts, rutas, APIs, pagos)
- D) Archivos modificados y pasos siguientes

---

**A) INVENTARIO DEL PROYECTO**

- Estructura de alto nivel (carpetas principales detectadas):

  - [frontend](frontend) — frontend React + Vite (Vite/Tailwind)
  - [backend](backend) — API Express.js (modular) con lógica de pagos y datos locales / Prisma
  - [initcase](initcase) — scripts para instalar/ejecutar (Windows .bat / .ps1)
  - [.env](.env) — archivo de ejemplo de variables de entorno

  Referencias: [frontend/package.json](frontend/package.json), [backend/package.json](backend/package.json), [initcase/](initcase)

- Stack real detectado

  - Frontend (FE):
    - Framework: React (v19) — referencia: [frontend/package.json](frontend/package.json)
    - Bundler: Vite — referencia: [frontend/package.json](frontend/package.json) y [frontend/vite.config.js](frontend/vite.config.js)
    - Router: React Router v7 — reference: [frontend/src/routes/index.jsx](frontend/src/routes/index.jsx)
    - Styling: TailwindCSS v4 — referencia: [frontend/package.json](frontend/package.json)
    - State: custom hooks (`frontend/src/hooks/*`) — no se detecta Redux/Zustand; referencia: [frontend/src/hooks/useRaffles.js](frontend/src/hooks/useRaffles.js)
    - UI libs: `lucide-react`, `framer-motion`, `swiper` — referencia: [frontend/package.json](frontend/package.json)

  - Backend (BE):
    - Runtime: Node.js (engines >=18) — [backend/package.json](backend/package.json#L1)
    - Framework: Express.js — [backend/package.json](backend/package.json) and [backend/server.js](backend/server.js)
    - Security middleware: `helmet`, `cors` — [backend/server.js](backend/server.js)
    - Validation: `express-validator` — [backend/package.json](backend/package.json)
    - Database: Prisma schema present ([backend/prisma/schema.prisma](backend/prisma/schema.prisma)), Prisma client used in some routes ([backend/src/db/prisma.js](backend/src/db/prisma.js)), but parts of the code use file-based JSON models ([backend/src/models/Raffle.js](backend/src/models/Raffle.js), [backend/src/models/Purchase.js](backend/src/models/Purchase.js)).
    - Payments: MercadoPago SDK (`mercadopago`) — [backend/package.json](backend/package.json), initialization at [backend/src/config/mercadopago.js](backend/src/config/mercadopago.js)

- Dependencias clave y scripts

  - Frontend: [frontend/package.json](frontend/package.json)
    - dependencies: `react`, `react-dom`, `react-router-dom`, `framer-motion`, `lucide-react`, `swiper`
    - devDependencies: `vite`, `tailwindcss`, `@vitejs/plugin-react`, `playwright`, eslint packages
    - scripts:
      - `dev`: `vite` — (local dev server)
      - `build`: `vite build`
      - `preview`: `vite preview`
      - `lint`: `eslint .`

  - Backend: [backend/package.json](backend/package.json)
    - dependencies: `express`, `cors`, `helmet`, `dotenv`, `mercadopago`, `prisma`, `@prisma/client`, `express-validator`
    - devDependencies: `nodemon`
    - scripts:
      - `start`: `node server.js`
      - `dev`: `nodemon server.js`
      - `seed-demo`: `node scripts/seed-demo.js`

- Rutas principales del Frontend (React Router)

  Extraídas de: [frontend/src/routes/index.jsx](frontend/src/routes/index.jsx)

  - GET `/` → `HomePage` (index)
  - GET `/sorteos` → `RafflesPage` (lista de sorteos)
  - GET `/sorteo/:id` → `RaffleDetailPage` (detalle + formulario compra)
  - GET `/ilustraciones` → `IllustrationsPage`
  - GET `/admin` → `AdminPage`
  - GET `/payment/success` → `PaymentSuccessPage`
  - GET `/payment/failure` → `PaymentFailurePage`
  - GET `/payment/pending` → `PaymentPendingPage`
  - `*` → `NotFoundPage`

  Referencia: [frontend/src/routes/index.jsx](frontend/src/routes/index.jsx)

- Endpoints del Backend (API REST)

  Montados en `/api` según [backend/src/routes/api/index.js](backend/src/routes/api/index.js)

  - Raffles ([backend/src/routes/api/raffles.js](backend/src/routes/api/raffles.js))
    - GET `/api/raffles` → `raffleController.getAll` — lista
    - GET `/api/raffles/categories` → `raffleController.getCategories` — categorias
    - GET `/api/raffles/:id` → `raffleController.getById` — detalle
    - POST `/api/raffles` → `raffleController.create`
    - PUT `/api/raffles/:id` → `raffleController.update`
    - DELETE `/api/raffles/:id` → `raffleController.remove`

  - Purchases ([backend/src/routes/api/purchases.js](backend/src/routes/api/purchases.js))
    - GET `/api/purchases` → `purchaseController.getAll`
    - GET `/api/purchases/:id` → `purchaseController.getById`
    - POST `/api/purchases/:id/confirm` → `purchaseController.confirm`
    - GET `/api/purchases/stats` → `purchaseController.getStats`

  - Payments ([backend/src/routes/api/payments.js](backend/src/routes/api/payments.js))
    - POST `/api/payments/create-preference` → `paymentController.createPreference` — crea preferencia MercadoPago
    - POST `/api/payments/webhook` → `paymentController.webhook` — webhook

  - Cards ([backend/src/routes/api/cards.js](backend/src/routes/api/cards.js))
    - GET `/api/cards` → lista (opcional `sorteoId`, `page`, `limit`)
    - GET `/api/cards/:id` → detalle
    - POST `/api/cards` → crear (usa `prisma.tarjetaIlustracion`)
    - PUT `/api/cards/:id` → actualizar

  - Assets ([backend/src/routes/api/assets.js](backend/src/routes/api/assets.js))
    - GET `/api/assets/cards` → lista de archivos en `public/cards` (solo nombres)

  - Orders (dev checkout) ([backend/src/routes/api/orders.js](backend/src/routes/api/orders.js))
    - POST `/api/orders/dev-checkout` → flujo transaccional (Prisma) que crea orden y tickets (dev flow)

  Referencias: archivos de rutas indicados arriba.

- Request / Response (formas inferidas)

  - POST `/api/payments/create-preference` — request body esperado (ver [backend/src/controllers/paymentController.js](backend/src/controllers/paymentController.js)):

    ```json
    {
      "raffleId": 123,
      "ticketCount": 2,
      "buyerName": "Nombre",
      "buyerEmail": "email@ejemplo.com",
      "buyerPhone": "+569..."
    }
    ```

    Response (backend):

    ```json
    {
      "preferenceId": "123456",
      "initPoint": "https://mp...",
      "sandboxInitPoint": "https://sandbox.mp...",
      "purchaseId": 12,
      "total": 5980
    }
    ```

    (Referencia: [backend/src/services/paymentService.js](backend/src/services/paymentService.js))

  - POST `/api/orders/dev-checkout` — request body esperado (ver [backend/src/routes/api/orders.js](backend/src/routes/api/orders.js)):

    ```json
    {
      "sorteoId": 1,
      "tarjetaId": 2,
      "ticketCount": 3,
      "buyerName": "...",
      "buyerEmail": "..."
    }
    ```

    Response ejemplo: `{ order: { ... }, tickets: [ ... ] }` (serializa `ticketPrice` y `total` a números) — referencia: [backend/src/routes/api/orders.js](backend/src/routes/api/orders.js)

- Modelos / Estructura de datos

  - Prisma schema: [backend/prisma/schema.prisma](backend/prisma/schema.prisma) — contiene `Sorteo` (`Sorteo`/`SorteoStatus`), `TarjetaIlustracion`, `OrdenCompra`, `Ticket`.
  - Implementación en código:
    - Hay código que usa Prisma (DB real): [backend/src/db/prisma.js](backend/src/db/prisma.js) y rutas como `cards.js`, `orders.js` usan `prisma` directamente.
    - Sin embargo, existen modelos basados en archivos JSON (persistencia local): [backend/src/models/Raffle.js](backend/src/models/Raffle.js), [backend/src/models/Purchase.js](backend/src/models/Purchase.js). Estos escriben en `backend/data/raffles.json` y `backend/data/purchases.json`.
    - Conclusión: coexisten dos aproximaciones de persistencia (Prisma / JSON files). Referencias: [backend/src/services/raffleService.js](backend/src/services/raffleService.js) (usa `prisma`) vs [backend/src/models/Raffle.js](backend/src/models/Raffle.js) (JSON). Atención: inconsistencia (ver auditoría).

- Flujo de compra / pagos (MercadoPago) — lo detectado en código

  - Frontend inicia la creación de preferencia con `paymentService.createPreference` que llama a `/api/payments/create-preference` — [frontend/src/services/paymentService.js](frontend/src/services/paymentService.js)
  - Backend: `paymentController.createPreference` valida campos y llama a `paymentService.createPaymentPreference` — [backend/src/controllers/paymentController.js](backend/src/controllers/paymentController.js)
  - `paymentService.createPaymentPreference` valida disponibilidad del sorteo, calcula `total`, crea preferencia MercadoPago usando `Preference` y `client` (configurado en [backend/src/config/mercadopago.js](backend/src/config/mercadopago.js)), luego crea una compra pendiente en `purchaseService` (usa `Purchase.create` en [backend/src/models/Purchase.js](backend/src/models/Purchase.js)) y devuelve `{ preferenceId, initPoint, sandboxInitPoint, purchaseId, total }`.
  - Webhook: `/api/payments/webhook` invoca `paymentService.processWebhook` que actualmente registra y devuelve un objeto simple; NO hay verificación de firma ni confirmación automática detallada (ver auditoría).

- Cómo se guarda el estado

  - Compras (pendientes/confirmadas): archivo JSON `backend/data/purchases.json` mediante [backend/src/models/Purchase.js](backend/src/models/Purchase.js).
  - Sorteos: `backend/data/raffles.json` mediante [backend/src/models/Raffle.js](backend/src/models/Raffle.js) (además hay un esquema Prisma en `backend/prisma/schema.prisma` y código Prisma usado por algunos endpoints).

- Configuración y variables de entorno detectadas

  - Archivo de ejemplo / actual: [/.env](.env)
    - `MP_ACCESS_TOKEN` — token MercadoPago (valor en repo: `your_mercado_pago_access_token_here`) — se documenta como sensible y debe ser reemplazado por `***REDACTED***` en documentación pública.
    - `PORT` — en `.env` = `3000` (nota: server default en código es `process.env.PORT || 3001` — ver inconsistencias).
    - `NODE_ENV` — `development` en `.env` (uso en server para logging) — [backend/.env](.env) and [backend/server.js](backend/server.js)
    - `DATABASE_URL` — ejemplo en `.env` (cadena MySQL) — [backend/.env](.env)

  - Otras variables consultadas en código (pueden venir del entorno, no todas aparecen en `.env`):
    - `PAYMENTS_ENABLED` — bandera para habilitar/deshabilitar pagos — [backend/src/config/index.js](backend/src/config/index.js)
    - `MP_ACCESS_TOKEN` — token MercadoPago — [backend/src/config/mercadopago.js](backend/src/config/mercadopago.js)
    - `CORS_ORIGIN` — origen permitido por CORS — [backend/src/config/index.js](backend/src/config/index.js)
    - `FRONTEND_URL`, `BACKEND_URL` — URLs base — [backend/src/config/index.js](backend/src/config/index.js)
    - Prisma DB envs: `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME` — utilizados en [backend/src/db/prisma.js](backend/src/db/prisma.js) (NO ENCONTRADO en `.env` salvo `DATABASE_URL`)

  - Frontend Vite env: `VITE_API_URL` — usado para construir `API_BASE_URL` y assets (detectado en `frontend/src/services/api.js` y `frontend/src/utils/assets.js`) — si no está definido el frontend usa `/api` (proxy) — [frontend/src/services/api.js](frontend/src/services/api.js)

- Deploy / Hosting (archivos detectados)

  - `backend/docker-compose.yml` existe y define un servicio `mariadb` con credenciales de ejemplo — [backend/docker-compose.yml](backend/docker-compose.yml)
  - No se detectó `Dockerfile` para la API ni para el frontend (resultado de búsqueda: NO ENCONTRADO)
  - No se detectaron `ecosystem.config.js` (PM2), `.htaccess`, o config Nginx/Apache específicos de Hostinger — NO ENCONTRADO

  Referencia: [backend/docker-compose.yml](backend/docker-compose.yml)

---

**B) AUDITORÍA RÁPIDA (PRIORIZADA)**

Nota: Cada item incluye Problema → Causa → Impacto → Sugerencia + rutas relevantes.

1) Inconsistencia de persistencia: coexistencia de Prisma y JSON files

   - Problema: Algunas partes del backend usan Prisma (`prisma` en `src/db/prisma.js`, `cards.js`, `orders.js`), mientras que otros módulos usan almacenamiento en archivos JSON (`models/Raffle.js`, `models/Purchase.js`).
   - Causa: Evolución parcial del proyecto hacia Prisma sin migrar todas las capas.
   - Impacto: Contratos inconsistentes, riesgo de datos divergentes, confusión en mantenimiento y posibles condiciones de carrera cuando ambos sistemas se usen simultáneamente.
   - Sugerencia: Elegir una estrategia (Prisma o JSON) y migrar todo a una sola fuente de verdad. Si se elige Prisma, transformar `models/*` a llamadas Prisma o retirar el uso de `prisma` hasta migrar. Medir esfuerzo: revisar `backend/src/services/*` y normalizar.
   - Rutas/archivos: [backend/src/db/prisma.js](backend/src/db/prisma.js), [backend/src/routes/api/orders.js](backend/src/routes/api/orders.js), [backend/src/routes/api/cards.js](backend/src/routes/api/cards.js), [backend/src/models/Raffle.js](backend/src/models/Raffle.js), [backend/src/models/Purchase.js](backend/src/models/Purchase.js), [backend/prisma/schema.prisma](backend/prisma/schema.prisma)

2) Pago / Webhook: falta verificación de firma y idempotencia

   - Problema: `paymentService.processWebhook` no verifica firma ni consulta la API de MercadoPago para confirmar estado; el webhook solamente registra y devuelve processed: true para tipo 'payment'.
   - Causa: Implementación incompleta o simplificada.
   - Impacto: Posible aceptación de notificaciones forjadas, inconsistencia en estados de compra, fraude, o confirmaciones duplicadas.
   - Sugerencia: Implementar verificación de firma/headers (MP ofrece `X-Hub-Signature` o usar `topic`/`id` + consultar el recurso con SDK y verificar `status`/`collection`), además garantizar idempotencia (buscar purchase por `preferenceId` o `preference_id` y sólo procesar cambios de estado). Añadir tests E2E para webhook.
   - Rutas/archivos: [backend/src/controllers/paymentController.js](backend/src/controllers/paymentController.js), [backend/src/services/paymentService.js](backend/src/services/paymentService.js), [backend/src/config/mercadopago.js](backend/src/config/mercadopago.js)

3) Configuración (PAYMENTS_ENABLED / MP_ACCESS_TOKEN / puerto) confusa e incongruente

   - Problema: `config.paymentsEnabled` se calcula con `process.env.PAYMENTS_ENABLED==='true'`; `mercadopago` client no se inicializa si `paymentsEnabled` es false. `.env` no define `PAYMENTS_ENABLED`. Además `.env` contiene `PORT=3000` pero `server.js` usa `config.port` cuya default es `3001`.
   - Causa: falta de sincronización entre documentación/env y código.
   - Impacto: En entornos sin `PAYMENTS_ENABLED=true` las rutas de pago fallarán o no estarán operativas; puerto real en uso puede diferir al esperado.
   - Sugerencia: Documentar claramente variables requeridas y defaults en README; validar al arranque y mostrar advertencias claras (server ya muestra algunos warnings). Unificar puerto por defecto en `.env.example` y documentación.
   - Rutas/archivos: [backend/src/config/index.js](backend/src/config/index.js), [backend/src/config/mercadopago.js](backend/src/config/mercadopago.js), [.env](.env), [backend/server.js](backend/server.js)

4) Manejo de errores y status codes incompletos

   - Problema: Algunos errores devueltos desde el servicio no preservan siempre `statusCode` y son re-lanzados; a veces controllers envían `next(error)` y confían en `errorHandler` para formatear.
   - Causa: Estilos mixtos en manejo de errores.
   - Impacto: Respuestas inconsistentes para clientes (frontend/consumo) y dificultad para depurar.
   - Sugerencia: Normalizar estructura de error (ej: `{ error: string, code?: string }`), y revisar middleware `errorHandler` para garantizar respuesta uniforme. Referencia: [backend/src/middleware/errorHandler.js](backend/src/middleware/errorHandler.js) (verificar implementacion).

5) Seguridad / Exposición accidental de secretos

   - Problema: `.env` en repo contiene placeholder `MP_ACCESS_TOKEN=your_mercado_pago_access_token_here` (no es un secreto real), pero README/commits pueden arriesgar exponer claves si se copian.
   - Causa: repositorio incluye `.env` de ejemplo.
   - Impacto: riesgo si se reemplaza con credenciales reales y se comete push accidental.
   - Sugerencia: Añadir `.env` a `.gitignore` (si no está) y proveer `.env.example` con placeholders; en la documentación marcar variables sensibles y ejemplo seguro. Reemplazar en docs por `***REDACTED***` al exponer valores reales.
   - Archivos: `.env`, [backend/src/config/mercadopago.js](backend/src/config/mercadopago.js)

6) DX: scripts y documentación incompletos para producción

   - Problema: No hay scripts de build/start unificados para producción (no Dockerfile para BE/FE), falta `README` preciso para despliegue en Hostinger / docker.
   - Impacto: onboarding más lento para nuevos devs y despliegue manual más propenso a errores.
   - Sugerencia: Añadir `Dockerfile` para backend y frontend, o documentar pasos de build y configuración de servidor (Nginx / reverse proxy). Incluir `npm run build` outputs y rutas de hosting.
   - Archivos: NO ENCONTRADO (Dockerfile), se detecta `backend/docker-compose.yml` para MariaDB.

---

**C) README OPERATIVO (copiable) — contenido que queda en `README.md`**

Nota: Esta sección es 100% copiable y lista para delegar. Contiene pasos exactos para levantar FE y BE en local.

## Resumen

Proyecto: Sorteando Weas — plataforma de sorteos online con UI en React (Vite + Tailwind) y API en Express. Integración de MercadoPago para pagos.

### Estructura rápida

- Frontend: [frontend](frontend) (React + Vite) — entrada: [frontend/src/main.jsx](frontend/src/main.jsx)
- Backend: [backend](backend) (Express) — entrada: [backend/server.js](backend/server.js)

### Requisitos

- Node.js >= 18 (ver `engines` en [backend/package.json](backend/package.json))
- npm (o yarn)
- Para usar Prisma / MySQL: MariaDB/MySQL si se activa Prisma. `backend/docker-compose.yml` incluye un servicio `mariadb` para desarrollo.

### Variables de entorno (tabla)

| Variable | Dónde se usa (archivo) | Ejemplo seguro / comentario |
|---|---:|---|
| `MP_ACCESS_TOKEN` | `backend/src/config/mercadopago.js`, `backend/src/config/index.js` | `***REDACTED***` (secreto) |
| `PAYMENTS_ENABLED` | `backend/src/config/index.js` (flag) | `true` / `false` |
| `PORT` | `backend/src/config/index.js`, `server.js` | `3001` (default en código) — `.env` actualiza a `3000` si se desea |
| `CORS_ORIGIN` | `backend/src/config/index.js` | `http://localhost:5173` por defecto |
| `FRONTEND_URL` | `backend/src/config/index.js` | `http://localhost:5173` |
| `BACKEND_URL` | `backend/src/config/index.js` | `http://localhost:3001` |
| `DATABASE_URL` | `backend/.env` y `prisma` | `mysql://USER:PASSWORD@HOST:3306/DB` (ejemplo) |
| `VITE_API_URL` | `frontend/src/services/api.js`, `frontend/src/utils/assets.js` | `http://localhost:3001` para evitar proxy |

> Si no encuentra la variable en el repo la marcamos NO ENCONTRADO.

### Instalar y ejecutar local (pasos exactos)

1) Backend

```powershell
cd backend
npm install
# Crear/editar .env (usar valores reales; MP_ACCESS_TOKEN debe permanecer en secreto)
# Ejemplo mínimo (crear si no existe):
# MP_ACCESS_TOKEN=***REDACTED***
# PORT=3001
# PAYMENTS_ENABLED=true
# FRONTEND_URL=http://localhost:5173
# DATABASE_URL="mysql://USER:PASSWORD@HOST:3306/NOMBRE_DB"

npm run dev   # inicia nodemon server.js (dev)
```

2) Frontend

```powershell
cd frontend
npm install
npm run dev   # inicia Vite en http://localhost:5173
```

3) Opcional: levantar base MariaDB (dev)

```powershell
cd backend
docker compose up -d   # necesita Docker Engine; revisa backend/docker-compose.yml
```

### Scripts (tabla)

| Área | Script | Comando | Descripción |
|---|---|---|---|
| Frontend | dev | `npm run dev` | Inicia Vite dev server ([frontend/package.json](frontend/package.json)) |
| Frontend | build | `npm run build` | Genera build de producción |
| Backend | dev | `npm run dev` | Inicia nodemon para desarrollo ([backend/package.json](backend/package.json)) |
| Backend | start | `npm start` | Inicia server con `node server.js` |
| Backend | seed-demo | `npm run seed-demo` | Script demo para semillas ([backend/package.json](backend/package.json)) |

### Rutas del Frontend (tabla)

| Ruta | Página / Componente | Descripción |
|---|---|---|
| `/` | `HomePage` | Home / resumen de sorteos ([frontend/src/pages/HomePage.jsx](frontend/src/pages/HomePage.jsx)) |
| `/sorteos` | `RafflesPage` | Lista de sorteos ([frontend/src/pages/RafflesPage.jsx](frontend/src/pages/RafflesPage.jsx)) |
| `/sorteo/:id` | `RaffleDetailPage` | Detalle del sorteo + `PurchaseForm` ([frontend/src/pages/RaffleDetailPage.jsx](frontend/src/pages/RaffleDetailPage.jsx)) |
| `/ilustraciones` | `IllustrationsPage` | Gestión/visualización de ilustraciones ([frontend/src/pages/IllustrationsPage.jsx](frontend/src/pages/IllustrationsPage.jsx)) |
| `/admin` | `AdminPage` | Panel administrativo ([frontend/src/pages/AdminPage.jsx](frontend/src/pages/AdminPage.jsx)) |

### API (Backend) — tabla de endpoints principales

| Método | Endpoint | Descripción | Body/Params (esperado) | Response |
|---|---|---|---|---|
| GET | `/api/raffles` | Lista de sorteos | query: `category`, `status` | Array de sorteos (ticketPrice/prizeValue num.) |
| GET | `/api/raffles/:id` | Detalle sorteo | param: `id` | Raffle object or 404 |
| GET | `/api/raffles/categories` | Categorías | - | Array |
| POST | `/api/raffles` | Crear sorteo (admin) | body: raffle data | Created raffle |
| POST | `/api/payments/create-preference` | Crear preferencia MercadoPago | `{ raffleId, ticketCount, buyerName, buyerEmail, buyerPhone }` | `{ preferenceId, initPoint, sandboxInitPoint, purchaseId, total }` |
| POST | `/api/payments/webhook` | Webhook MercadoPago | body: notification | `{ processed: true }` (impl. actual) |
| POST | `/api/orders/dev-checkout` | Checkout dev | `{ sorteoId, tarjetaId, ticketCount, buyerName, buyerEmail }` | `{ order, tickets }` |
| GET | `/api/assets/cards` | Lista archivos `public/cards` | - | `{ files: [] }` |

### Pagos (MercadoPago)

Flujo, estados y manejo de errores:

- FE llama a `/api/payments/create-preference` y utiliza `initPoint` o `sandboxInitPoint` para redirigir.
- BE lanza errores 400/503 según validaciones y configuración (ej. `Pagos deshabilitados` cuando `PAYMENTS_ENABLED` no es `true`).
- Webhook: actualmente no verifica firma ni realiza consulta confirmatoria; pendiente de implementación segura.

### Estructura del repo

- ver sección A (arriba)

### Deployment (Hostinger / producción)

- NO SE DETECTÓ configuración específica para Hostinger (NO ENCONTRADO). Recomendación: usar `npm run build` en `frontend` y servir `dist` con Nginx o static hosting; exponer API en dominio separado o reverse proxy.

### Troubleshooting

- `Missing @prisma/adapter-mariadb` → instalar `@prisma/adapter-mariadb` si se usa Prisma ([backend/src/db/prisma.js](backend/src/db/prisma.js)).
- Ver `PAYMENTS_ENABLED` y `MP_ACCESS_TOKEN` si rutas de pago retornan 503 o 502.

### Roadmap / Próximos pasos

1. Unificar persistencia (Prisma vs JSON).
2. Implementar verificación e idempotencia en webhook.
3. Añadir Dockerfile y CI/CD para build y despliegue.

### Licencia

- `ISC` (según [backend/package.json](backend/package.json))

---

**D) Archivos tocados / creados por esta tarea**

- Actualizado: [README.md](README.md) — reemplazado por este contenido.

---

Si quieres que:

- haga un commit y un push automático a `main` desde este entorno, indícalo (lo intentaré ahora). Si falla por permisos/remote, reporto el error.
- cree `.env.example` con los placeholders y un `CONTRIBUTING.md`, lo genero ahora si me confirmas.
