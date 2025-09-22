import { appDataDir, BaseDirectory, join } from "@tauri-apps/api/path";
import { exists, mkdir } from "@tauri-apps/plugin-fs";

export default async function myAppDataPath() {
  const userDataPath = await appDataDir();

  const myAppDataDir = await join(userDataPath, "data");

  const dirExists = await exists(myAppDataDir, {
    baseDir: BaseDirectory.AppData,
  });
  if (!dirExists) {
    await mkdir("data", { baseDir: BaseDirectory.AppLocalData });
  }

  return myAppDataDir;
}
