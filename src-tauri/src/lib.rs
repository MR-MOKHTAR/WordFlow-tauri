// src/lib.rs
mod pdf; // ← ماژول pdf رو اضافه کن

use tauri_plugin_sql::{Migration, MigrationKind};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // اسکیمای دیتابیس: یادداشت‌ها و سلول‌ها (رابطه‌ای)
    let migrations = vec![Migration {
        version: 1,
        description: "create notes and cells tables",
        sql: "
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                created_at INTEGER NOT NULL,
                updated_at INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS cells (
                id TEXT PRIMARY KEY,
                note_id INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
                position INTEGER NOT NULL,
                title TEXT,
                content TEXT,
                is_open INTEGER NOT NULL DEFAULT 1
            );
            CREATE INDEX IF NOT EXISTS idx_cells_note ON cells(note_id, position);
        ",
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:wordflow.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            pdf::export_to_pdf // * ثبت دستور جدید
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
