import { useCallback } from "react";
import useFilesContext from "../contexts/FilesContext/useFilesContext";
import { listNotes } from "../../services/db/notesRepo";

export default function useFetchFiles() {
  const { openFile } = useFilesContext();

  const fetchFiles = useCallback(async () => {
    try {
      const names = await listNotes();
      // Register each note in state; cells are lazily loaded on click.
      names.forEach((name) => openFile(name, []));
    } catch (err) {
      console.error(err);
    }
  }, [openFile]);

  return fetchFiles;
}
