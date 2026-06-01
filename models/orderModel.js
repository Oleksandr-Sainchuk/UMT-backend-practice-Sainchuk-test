import prisma from "../helpers/prisma.js";

export async function create(orderPayload) {
  return prisma.order.create({
    data: orderPayload,
  });
}
