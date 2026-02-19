# Front ↔ Back Contract

This document lists the API endpoints used by the frontend, the backend routes implemented, expected shapes, and where frontend normalizes responses.

## Endpoints used by frontend (service → method + path)
- raffleService.getAll: GET /api/raffles
- raffleService.getById: GET /api/raffles/:id
- raffleService.getCategories: GET /api/raffles/categories
- raffleService.create: POST /api/raffles
- raffleService.update: PUT /api/raffles/:id
- raffleService.delete: DELETE /api/raffles/:id

- cardsService.listByRaffle: GET /api/cards?sorteoId={sorteoId}&limit={limit}

- purchaseService.getAll: GET /api/purchases
- purchaseService.getById: GET /api/purchases/:id
- purchaseService.confirm: POST /api/purchases/:id/confirm
- purchaseService.getStats: GET /api/purchases/stats

- paymentService.createPreference: POST /api/payments/create-preference

- ordersService.devCheckout: POST /api/orders/dev-checkout

## Endpoints defined in backend (`backend/src/routes/api/*`)
- GET  /api/raffles
- GET  /api/raffles/:id
- GET  /api/categories  (mounted at /api/raffles/categories)
- POST /api/raffles
- PUT  /api/raffles/:id
- DELETE /api/raffles/:id

- GET  /api/purchases
- GET  /api/purchases/:id
- POST /api/purchases/:id/confirm
- GET  /api/purchases/stats

- POST /api/payments/create-preference
- POST /api/payments/webhook

- GET  /api/assets/cards

- POST /api/cards
- PUT  /api/cards/:id
- GET  /api/cards
- GET  /api/cards/:id

- POST /api/orders/dev-checkout

## Comparative table (Front uses → Backend provides)
| Method | Path | Frontend uses | Backend provides | Status |
|---|---|:---:|:---:|---|
| GET | /api/raffles | ✓ | ✓ | OK |
| GET | /api/raffles/:id | ✓ | ✓ | OK |
| GET | /api/raffles/categories | ✓ | ✓ | OK |
| POST | /api/raffles | ✓ | ✓ | OK |
| PUT | /api/raffles/:id | ✓ | ✓ | OK |
| DELETE | /api/raffles/:id | ✓ | ✓ | OK |
| GET | /api/cards | ✓ | ✓ | OK |
| GET | /api/cards/:id |  | ✓ | No usado en frontend |
| POST | /api/cards |  | ✓ | No usado in frontend |
| PUT | /api/cards/:id |  | ✓ | No usado in frontend |
| GET | /api/purchases | ✓ | ✓ | OK |
| GET | /api/purchases/:id | ✓ | ✓ | OK |
| POST | /api/purchases/:id/confirm | ✓ | ✓ | OK |
| GET | /api/purchases/stats | ✓ | ✓ | OK |
| POST | /api/payments/create-preference | ✓ | ✓ | OK |
| POST | /api/payments/webhook |  | ✓ | No usado in frontend |
| GET | /api/assets/cards |  | ✓ | No usado in frontend |
| POST | /api/orders/dev-checkout | ✓ | ✓ | OK |

## Shapes and Normalizers
- GET /api/cards
  - Backend returns: `{ data: [ { id, title, image, metadata, sorteoId, ... } ], meta: { page, limit, total } }`
  - Frontend `cardsService.listByRaffle` calls `apiFetch` then `normalizeCardsResponse(res)`.
  - Normalizer: `frontend/src/services/normalizers/cards.js`
    - Returns `[]` if response falsy
    - Returns the response itself if it's an array
    - Returns `res.data` if present and array
    - Else returns `[]`
  - Result: frontend uses array of card objects, tolerant of either array or `{data,meta}` shape.

- GET /api/raffles and GET /api/raffles/:id
  - Backend returns raffle objects where `ticketPrice` and `prizeValue` are serialized to numbers by `serializeRaffle`.
  - Frontend `raffleService` consumes objects directly; status filters are normalized via `frontend/src/services/normalizers/status.js`.

- POST /api/payments/create-preference
  - Backend returns `{ preferenceId, initPoint, sandboxInitPoint, purchaseId, total }`.
  - Frontend `paymentService.createPreference` expects these keys and `PurchaseForm` uses `initPoint`/`sandboxInitPoint` to redirect.

- POST /api/orders/dev-checkout
  - Backend returns `{ order: <order>, tickets: [<ticket>] }` with `order.ticketPrice` and `order.total` numeric.
  - Frontend uses this payload in dev checkout flow.

## Single sources of change
- `frontend/src/services/endpoints.js` — single place to change route paths used by frontend services.
- `frontend/src/services/api.js` — single fetch wrapper that sets base URL, headers, error handling.
- `frontend/src/services/normalizers/*` — place for response normalization logic.

---

> Note: This audit is read-only; no backend changes performed. The frontend already centralizes endpoints and normalizers in `src/services/` (endpoints.js, normalizers). Keep these files as the only source of truth for paths and shapes.
