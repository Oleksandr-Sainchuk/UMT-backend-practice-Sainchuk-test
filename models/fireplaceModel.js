import { PRODUCT_CATEGORIES } from "../constants/categories.js";
import { buildPaginatedResponse } from "../helpers/pagination.js";
import prisma from "../helpers/prisma.js";

export async function findPaginated({ page, perPage, category }) {
  const where = category && PRODUCT_CATEGORIES.includes(category) ? { category } : {};

  const products = await prisma.product.findMany({
    where,
    orderBy: { id: "asc" },
  });

  return buildPaginatedResponse(products, { page, perPage });
}
