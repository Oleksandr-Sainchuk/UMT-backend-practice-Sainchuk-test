import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import "dotenv/config";

import prisma from "../helpers/prisma.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seedPath = path.join(__dirname, "../data/db.seed.json");
const seed = JSON.parse(readFileSync(seedPath, "utf8"));

await prisma.order.deleteMany();
await prisma.feedback.deleteMany();
await prisma.product.deleteMany();

await prisma.product.createMany({ data: seed.products });
await prisma.feedback.createMany({ data: seed.feedbacks });

console.log(`Seeded ${seed.products.length} products and ${seed.feedbacks.length} feedbacks.`);

await prisma.$disconnect();
