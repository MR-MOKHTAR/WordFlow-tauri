import { appDataDir, join } from "@tauri-apps/api/path";
import { exists, mkdir } from "@tauri-apps/plugin-fs";

export default async function myAppDataPath() {
  const userDataPath = await appDataDir();

  const myAppDataDir = await join(userDataPath, "data");

  const dirExists = await exists(myAppDataDir);
  if (!dirExists) {
    await mkdir(myAppDataDir);
  }

  alert(myAppDataDir);

  return myAppDataDir;
}
