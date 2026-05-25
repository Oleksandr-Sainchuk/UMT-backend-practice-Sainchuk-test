import { loadDb, saveDb } from "../helpers/jsonDb.js";

export function create(orderPayload) {
  const db = loadDb();

  if (!Array.isArray(db.orders)) {
    db.orders = [];
  }

  const nextId = db.orders.reduce((maxId, order) => Math.max(maxId, Number(order.id) || 0), 0) + 1;

  const order = {
    id: nextId,
    ...orderPayload,
    createdAt: new Date().toISOString(),
  };

  db.orders.push(order);
  saveDb(db);

  return order;
}
