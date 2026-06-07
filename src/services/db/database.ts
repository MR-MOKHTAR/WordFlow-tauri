import Database from "@tauri-apps/plugin-sql";

export const DB_URL = "sqlite:wordflow.db";

let dbPromise: Promise<Database> | null = null;

/**
 * Lazily opens (once) the SQLite database. Migrations registered on the Rust
 * side run automatically the first time the connection is loaded.
 */
export function getDb(): Promise<Database> {
  if (!dbPromise) {
    dbPromise = Database.load(DB_URL);
  }
  return dbPromise;
}
