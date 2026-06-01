import prisma from "../helpers/prisma.js";

export async function findAll() {
  const feedbacks = await prisma.feedback.findMany({
    orderBy: { id: "asc" },
  });

  return feedbacks.map((feedback) => ({
    ...feedback,
    id: String(feedback.id),
  }));
}
