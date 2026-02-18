# Backend Context Pack

This file summarizes the backend dev-checkout tests and key runtime details.

## Environment
- Server: `http://localhost:3001`
- Dev checkout endpoint: `POST /api/orders/dev-checkout`
- Payments: disabled for local dev (`PAYMENTS_ENABLED=false`)

## Test Requests (sent from workspace tmp/)

1) invalid.json

Request body:
```
{"sorteoId":"abc","tarjetaId":1,"ticketCount":1,"buyerName":"T","buyerEmail":"t@t.com"}
```

Response (raw):
```
HTTP/1.1 400 Bad Request
{"error":"IDs inválidos"}
```

2) ok.json

Request body:
```
{"sorteoId":5,"tarjetaId":3,"ticketCount":3,"buyerName":"Test","buyerEmail":"test@test.com"}
```

Response (raw):
```
HTTP/1.1 400 Bad Request
{"error":"Tickets insuficientes o sorteo no activo"}
```

3) too_many.json

Request body:
```
{"sorteoId":5,"tarjetaId":3,"ticketCount":999,"buyerName":"Test","buyerEmail":"test@test.com"}
```

Response (raw):
```
HTTP/1.1 400 Bad Request
{"error":"Tickets insuficientes o sorteo no activo"}
```

## Notes
- The dev-checkout endpoint validates numeric IDs and ticket availability. If `sorteo.ticketsSold` is already near `totalTickets`, attempts to reserve more tickets will return 400.
- Earlier in this session there were successful dev-checkout runs; current DB state (sorteo id=5 has `ticketsSold: 9` / `totalTickets: 10`) causes the `ok.json` case to fail.

If you want, I can:
- reset `ticketsSold` for a specific raffle and re-run the `ok.json` test to get a 201 success, or
- implement `createMany` for tickets to optimize bulk ticket creation.
