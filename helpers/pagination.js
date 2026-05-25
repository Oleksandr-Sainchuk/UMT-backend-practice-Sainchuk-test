export function buildPaginatedResponse(items, { page, perPage }) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage) || 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * perPage;
  const data = items.slice(start, start + perPage);

  return {
    data: data.map((item) => ({
      ...item,
      id: String(item.id),
    })),
    meta: {
      first: 1,
      prev: safePage > 1 ? safePage - 1 : null,
      next: safePage < totalPages ? safePage + 1 : null,
      last: totalPages,
      pages: totalPages,
      items: totalItems,
    },
  };
}
