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

Full CRUD is available for fireplace (products), feedback, and order. See [Swagger UI](http://localhost:3001/api-docs) for request/response schemas.

### Fireplace

| Method | Path                 | Description                                                  |
| ------ | -------------------- | ------------------------------------------------------------ |
| GET    | `/api/fireplace`     | Paginated list (`page`, `per-page`, `category`)              |
| GET    | `/api/fireplace/:id` | Get one product by id                                        |
| POST   | `/api/fireplace`     | Create product (`img`, `title`, `desc`, `price`, `category`) |
| PATCH  | `/api/fireplace/:id` | Partially update product by id                               |
| DELETE | `/api/fireplace/:id` | Delete product by id                                         |

### Feedback

| Method | Path                | Description                                              |
| ------ | ------------------- | -------------------------------------------------------- |
| GET    | `/api/feedback`     | Get all feedback                                         |
| GET    | `/api/feedback/:id` | Get one feedback by id                                   |
| POST   | `/api/feedback`     | Create feedback (`rating`, `text`, `author`, `location`) |
| PATCH  | `/api/feedback/:id` | Partially update feedback by id                          |
| DELETE | `/api/feedback/:id` | Delete feedback by id                                    |

### Order

| Method | Path             | Description                                                       |
| ------ | ---------------- | ----------------------------------------------------------------- |
| GET    | `/api/order`     | Get all orders                                                    |
| GET    | `/api/order/:id` | Get one order by id                                               |
| POST   | `/api/order`     | Create order (`name`, `phone`, `address`, `comment`, `productId`) |
| PATCH  | `/api/order/:id` | Partially update order by id                                      |
| DELETE | `/api/order/:id` | Delete order by id                                                |

**Frontend compatibility** (Vite strips `/api`):

- `GET /products` — same as fireplace list
- `GET /feedback`, `POST /feedback`, `PATCH /feedback/:id`, `DELETE /feedback/:id`
- `GET /order`, `POST /order`, `PATCH /order/:id`, `DELETE /order/:id`

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
prisma/seed/        Database seed scripts (fireplace, feedback, order)
```

## Environment

Copy `.env.example` to `.env`.

## Database

| Command                  | Description                        |
| ------------------------ | ---------------------------------- |
| `npm run db:up`          | Start PostgreSQL in Docker         |
| `npm run db:down`        | Stop PostgreSQL container          |
| `npm run db:logs`        | Follow Postgres container logs     |
| `npm run seed`           | Run seed scripts in `prisma/seed/` |
| `npx prisma migrate dev` | Apply migrations (development)     |

Docker Postgres runs on **localhost:5433** (so it does not conflict with Postgres.app on 5432).

## Seed

```bash
npm run seed
```

Re-imports fireplaces and feedback from `prisma/seed/`. Clears existing orders, feedback, and products first.
