import { join } from "@tauri-apps/api/path";
import { remove } from "@tauri-apps/plugin-fs";
import myAppDataPath from "./AppDataPath";

async function deleteFile(fileName: string) {
  const userAppDataPath = await myAppDataPath();

  const filePath = await join(userAppDataPath, fileName);

  try {
    await remove(filePath);
    return { success: true, message: `فایل ${fileName} با موفقیت حذف شد.` };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}

export default deleteFile;
