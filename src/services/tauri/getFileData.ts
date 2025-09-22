import { join } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/plugin-fs";
import myAppDataPath from "./AppDataPath";

export default async function getFileData<T = unknown>(fileName: string) {
  const myAppDataDir = await myAppDataPath();
  const filePath = await join(myAppDataDir, fileName);

  try {
    const text = await readTextFile(filePath);
    const data: T = JSON.parse(text); // 👈 اینجا تبدیل به JSON
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
