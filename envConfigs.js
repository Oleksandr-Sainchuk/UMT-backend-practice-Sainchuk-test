import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseCorsOrigins() {
  const defaults =
    process.env.NODE_ENV === "production"
      ? ["http://localhost:3000"]
      : ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001"];

  const fromEnv = (process.env.CORS_ORIGIN ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return [...new Set([...fromEnv, ...defaults])];
}

const config = {
  port: Number(process.env.PORT) || 3001,
  nodeEnv: process.env.NODE_ENV ?? "development",
  corsOrigins: parseCorsOrigins(),
  dbFilePath: path.resolve(__dirname, "data/db.json"),
};

export default config;
