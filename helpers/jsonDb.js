import { readFileSync, writeFileSync } from "node:fs";

import config from "../envConfigs.js";

function readDbFromDisk() {
  const raw = readFileSync(config.dbFilePath, "utf8");
  return JSON.parse(raw);
}

export function loadDb() {
  return readDbFromDisk();
}

export function saveDb(db) {
  writeFileSync(config.dbFilePath, `${JSON.stringify(db, null, 4)}\n`, "utf8");
  return db;
}
