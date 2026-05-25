# UMT Backend Practice

Express API for the [UMT markup frontend](../UMT-markup-practice-Sainchuk). Data is stored in `data/db.json` (PostgreSQL-ready repository layout in `models/`).

## Quick start

```bash
npm install
npm run dev
```

Swagger UI: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

Run the frontend (`npm run dev` on port 3000) in a second terminal.

## API routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/fireplace` | Paginated products (`page`, `per-page`, `category`) |
| GET | `/api/feedbacks` | All feedbacks |
| POST | `/api/orders` | Create order (`name`, `phone`, `address`, `comment`) |

**Frontend compatibility** (Vite strips `/api`):

- `GET /products` — same as fireplace list
- `GET /feedbacks`
- `POST /orders`

## Project structure

```
constants/     HTTP status codes, category enums
controllers/   Request handlers
helpers/       createRouter, validation, pagination, json DB
middlewares/   404 and error handler
models/        Data access (swap for PostgreSQL later)
routes/api/    Route definitions via createRouter
schemas/       Joi validation
scripts/       seed utility
data/db.json   Source of truth (products, feedbacks, orders)
```

## Environment

Copy `.env.example` to `.env`.

## Seed

`data/db.json` is committed. To reset from `data/db.seed.json`:

```bash
npm run seed
```
