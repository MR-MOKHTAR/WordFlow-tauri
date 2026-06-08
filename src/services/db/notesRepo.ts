import type Database from "@tauri-apps/plugin-sql";
import { getDb } from "./database";
import { CellType } from "../../components/Types";
import i18n from "../../components/i18next/i18n";

type NoteRow = { id: number };
type CellRow = {
  id: string;
  title: string | null;
  content: string | null;
  is_open: number;
};

async function getNoteId(
  db: Database,
  name: string,
): Promise<number | null> {
  const rows = await db.select<NoteRow[]>(
    "SELECT id FROM notes WHERE name = ?",
    [name],
  );
  return rows.length ? rows[0].id : null;
}

async function ensureNoteId(db: Database, name: string): Promise<number> {
  const now = Date.now();
  await db.execute(
    "INSERT OR IGNORE INTO notes (name, created_at, updated_at) VALUES (?, ?, ?)",
    [name, now, now],
  );
  const id = await getNoteId(db, name);
  if (id == null) throw new Error(`Failed to resolve note id for "${name}"`);
  return id;
}

/** All note names, most-recently-updated first. */
export async function listNotes(): Promise<string[]> {
  const db = await getDb();
  const rows = await db.select<{ name: string }[]>(
    "SELECT name FROM notes ORDER BY updated_at DESC, name ASC",
  );
  return rows.map((r) => r.name);
}

/** Create a new note seeded with a single empty cell. */
export async function createNote(
  name: string,
): Promise<{ success: boolean; error?: string }> {
  const db = await getDb();
  try {
    const existing = await getNoteId(db, name);
    if (existing != null) {
      return { success: false, error: i18n.t("toast.fileExists") };
    }
    const now = Date.now();
    await db.execute(
      "INSERT INTO notes (name, created_at, updated_at) VALUES (?, ?, ?)",
      [name, now, now],
    );
    const id = await getNoteId(db, name);
    await db.execute(
      "INSERT INTO cells (id, note_id, position, title, content, is_open) VALUES (?, ?, ?, ?, ?, ?)",
      [crypto.randomUUID(), id, 0, "", "", 1],
    );
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Delete a note and all of its cells. */
export async function deleteNote(
  name: string,
): Promise<{ success: boolean; message?: string; error?: string }> {
  const db = await getDb();
  try {
    const id = await getNoteId(db, name);
    if (id != null) {
      await db.execute("DELETE FROM cells WHERE note_id = ?", [id]);
      await db.execute("DELETE FROM notes WHERE id = ?", [id]);
    }
    return { success: true, message: i18n.t("toast.fileDeleted", { name }) };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Rename a note. Fails if the new name already exists. */
export async function renameNote(
  oldName: string,
  newName: string,
): Promise<{ success: boolean; error?: string }> {
  const db = await getDb();
  const name = newName.trim();
  if (!name) return { success: false, error: i18n.t("toast.fileCreateError") };
  if (name === oldName) return { success: true };
  try {
    const taken = await getNoteId(db, name);
    if (taken != null) {
      return { success: false, error: i18n.t("toast.fileExists") };
    }
    await db.execute("UPDATE notes SET name = ?, updated_at = ? WHERE name = ?", [
      name,
      Date.now(),
      oldName,
    ]);
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Load the ordered cells of a note. */
export async function loadCells(
  name: string,
): Promise<{ success: boolean; data: CellType[]; error?: string }> {
  const db = await getDb();
  try {
    const id = await getNoteId(db, name);
    if (id == null) return { success: true, data: [] };

    const rows = await db.select<CellRow[]>(
      "SELECT id, title, content, is_open FROM cells WHERE note_id = ? ORDER BY position ASC",
      [id],
    );
    const data: CellType[] = rows.map((r) => ({
      id: r.id,
      title: r.title ?? "",
      content: r.content ?? "",
      isOpen: !!r.is_open,
    }));
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      data: [],
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Replace a note's cells with the given array (delete + bulk insert).
 * Used for the conservative event-driven saves (blur / Ctrl+S / app close).
 */
export async function saveCells(
  name: string,
  cells: CellType[],
): Promise<{ success: boolean; error?: string }> {
  const db = await getDb();
  try {
    const id = await ensureNoteId(db, name);
    await db.execute("UPDATE notes SET updated_at = ? WHERE id = ?", [
      Date.now(),
      id,
    ]);
    await db.execute("DELETE FROM cells WHERE note_id = ?", [id]);

    if (cells.length) {
      const placeholders = cells.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");
      const params: (string | number)[] = [];
      cells.forEach((c, index) => {
        params.push(
          c.id,
          id,
          index,
          c.title ?? "",
          c.content ?? "",
          c.isOpen ? 1 : 0,
        );
      });
      await db.execute(
        `INSERT INTO cells (id, note_id, position, title, content, is_open) VALUES ${placeholders}`,
        params,
      );
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}
