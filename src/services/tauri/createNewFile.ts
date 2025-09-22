import { join } from "@tauri-apps/api/path";
import { exists, writeTextFile } from "@tauri-apps/plugin-fs";
import myAppDataPath from "./AppDataPath";

type Cell = {
  id: string;
  content: string;
  isOpen: boolean;
};

const emptyCell: Cell = {
  id: crypto.randomUUID(),
  content: "",
  isOpen: true,
};

function createNewFile() {
  const createFileHandler = async (fileName: string) => {
    const userAppDataPath = await myAppDataPath();
    const filePath = await join(userAppDataPath, fileName);

    try {
      const checkFile = await exists(filePath);
      if (checkFile) {
        return { success: false, error: "فایلی با این نام وجود دارد!" };
      }

      await writeTextFile(filePath, JSON.stringify(emptyCell));
      return { success: true, path: filePath };
    } catch (err: unknown) {
      return { success: false, error: String(err) };
    }
  };
  return createFileHandler;
}

export default createNewFile;
