import { join } from "@tauri-apps/api/path";
import appDataPath from "./AppDataPath";
import { writeTextFile } from "@tauri-apps/plugin-fs";

async function saveJsonFile(fileName: string, content: object[]) {
  const userAppDataPath = await appDataPath();
  const filePath = await join(userAppDataPath, fileName);

  try {
    await writeTextFile(filePath, JSON.stringify(content));
    return { success: true, path: filePath };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
export default saveJsonFile;
