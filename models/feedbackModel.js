import { loadDb } from "../helpers/jsonDb.js";

export function findAll() {
  const db = loadDb();
  const feedbacks = db.feedbacks ?? [];

  return feedbacks.map((feedback) => ({
    ...feedback,
    id: String(feedback.id),
  }));
}
