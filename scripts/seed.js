import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, "../data");
const dbPath = path.join(dataDir, "db.json");
const seedPath = path.join(dataDir, "db.seed.json");

if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

if (!existsSync(seedPath)) {
  console.error("Missing data/db.seed.json — add a seed file or copy db.json manually.");
  process.exit(1);
}

copyFileSync(seedPath, dbPath);
console.log(`Database written to ${dbPath}`);
