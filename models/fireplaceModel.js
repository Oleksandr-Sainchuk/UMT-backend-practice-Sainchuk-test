import { PRODUCT_CATEGORIES } from "../constants/categories.js";
import { buildPaginatedResponse } from "../helpers/pagination.js";
import { loadDb } from "../helpers/jsonDb.js";

export function findPaginated({ page, perPage, category }) {
  const db = loadDb();
  let products = db.products ?? [];

  if (category && PRODUCT_CATEGORIES.includes(category)) {
    products = products.filter((product) => product.category === category);
  }

  return buildPaginatedResponse(products, { page, perPage });
}
