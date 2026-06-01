# UMT Backend Practice

Express API for the [UMT markup frontend](../UMT-markup-practice-Sainchuk). Data is stored in **PostgreSQL** via **Prisma ORM**.

## Quick start

### Option A — Docker Postgres (recommended for local dev)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
npm install
cp .env.example .env          # DATABASE_URL points at Docker on port 5433
npm run db:up                 # start PostgreSQL container
npx prisma migrate dev
npm run seed
npm run dev
```

Stop the database:

```bash
npm run db:down
```

### Option B — Postgres.app (no Docker)

```bash
npm install
cp .env.example .env          # uncomment the Postgres.app DATABASE_URL line
# create DB: psql -d postgres -c "CREATE DATABASE umt_backend_test;"
npx prisma migrate dev
npm run seed
npm run dev
```

Swagger UI: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

Run the frontend (`npm run dev` on port 3000) in a second terminal.

## API routes

| Method | Path             | Description                                          |
| ------ | ---------------- | ---------------------------------------------------- |
| GET    | `/api/fireplace` | Paginated products (`page`, `per-page`, `category`)  |
| GET    | `/api/feedbacks` | All feedbacks                                        |
| POST   | `/api/orders`    | Create order (`name`, `phone`, `address`, `comment`) |

**Frontend compatibility** (Vite strips `/api`):

- `GET /products` — same as fireplace list
- `GET /feedbacks`
- `POST /orders`

## Project structure

```
constants/          HTTP status codes, category enums
controllers/        Request handlers
helpers/            validation, pagination, Prisma client
middlewares/        404 and error handler
models/             Data access (Prisma)
prisma/             Schema and migrations
routes/api/         Route definitions via createRouter
schemas/            Joi validation
scripts/            Database seed
data/db.seed.json   Seed source for products and feedbacks
```

## Environment

Copy `.env.example` to `.env`.

## Database

| Command                  | Description                        |
| ------------------------ | ---------------------------------- |
| `npm run db:up`          | Start PostgreSQL in Docker         |
| `npm run db:down`        | Stop PostgreSQL container          |
| `npm run db:logs`        | Follow Postgres container logs     |
| `npm run seed`           | Load data from `data/db.seed.json` |
| `npx prisma migrate dev` | Apply migrations (development)     |

Docker Postgres runs on **localhost:5433** (so it does not conflict with Postgres.app on 5432).

## Seed

```bash
npm run seed
```

Re-imports products and feedbacks from `data/db.seed.json`. Clears existing orders, feedbacks, and products first.
