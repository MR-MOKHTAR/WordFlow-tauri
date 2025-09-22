import { useCallback } from "react";
import useFilesContext from "../contexts/FilesContext/useFilesContext";
import { readDir } from "@tauri-apps/plugin-fs";
import myAppDataPath from "../../services/tauri/AppDataPath";

export default function useFetchFiles() {
  const { openFile } = useFilesContext();

  const fetchFiles = useCallback(async () => {
    try {
      const myAppDataDir = await myAppDataPath();
      const files = await readDir(myAppDataDir);
      const jsonFiles = files.filter((f) => f.name.endsWith(".json"));

      jsonFiles.forEach((file) => openFile(file.name, []));
      console.log(jsonFiles);
    } catch (err) {
      console.error(err);
    }
  }, [openFile]);

  return fetchFiles;
}
