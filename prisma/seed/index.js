import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

import { seedFeedbacks } from "./feedback.js";
import { seedFireplaces } from "./fireplace.js";
import { seedOrders } from "./order.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.order.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.product.deleteMany();

  const fireplaceCount = await seedFireplaces(prisma);
  const feedbackCount = await seedFeedbacks(prisma);
  const orderCount = await seedOrders(prisma);

  console.log(`Seeded ${fireplaceCount} fireplaces, ${feedbackCount} feedback, ${orderCount} orders.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
