/**
 * db.js
 * Simple JSON file-based data store.
 * Loads data into memory on first access, writes back on mutations.
 */

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data");

const cache = {};

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

function load(name) {
  if (!cache[name]) {
    const fp = filePath(name);
    if (!fs.existsSync(fp)) {
      throw new Error(
        `Data file "${name}.json" not found. Run: npm run seed`
      );
    }
    cache[name] = JSON.parse(fs.readFileSync(fp, "utf-8"));
  }
  return cache[name];
}

function save(name) {
  fs.writeFileSync(filePath(name), JSON.stringify(cache[name], null, 2));
}

// ── Generic helpers ───────────────────────────────────────────────────────────

function getAll(name) {
  return load(name);
}

function findById(name, field, value) {
  return load(name).find((r) => r[field] === value) || null;
}

function search(name, field, query) {
  const q = query.toLowerCase();
  return load(name).filter((r) =>
    String(r[field]).toLowerCase().includes(q)
  );
}

function insert(name, record) {
  const data = load(name);
  data.push(record);
  save(name);
  return record;
}

module.exports = { getAll, findById, search, insert };
