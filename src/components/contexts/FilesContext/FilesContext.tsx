import { useCallback, useRef, useState, useEffect, memo, useMemo } from "react";
import { CellType, FilesContextType, FileState } from "../../Types";
import { FilesContext } from "../contexts";
import getFileData from "../../../services/tauri/getFileData";

function FilesProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<Record<string, FileState>>({});
  const [activeFile, setActiveFile] = useState<string | null>(null);

  const filesRef = useRef(files);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const cleanupTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {}
  );

  const openFile = useCallback((name: string, cells: CellType[] = []) => {
    if (cleanupTimers.current[name]) {
      clearTimeout(cleanupTimers.current[name]);
      delete cleanupTimers.current[name];
    }

    setFiles((prev) => {
      const existing = prev[name];
      return {
        ...prev,
        [name]: {
          name,
          cells: existing?.cells.length ? existing.cells : cells,
          isDirty: existing?.isDirty ?? false,
          hasLoadedOnce: true,
          lastOpened: Date.now(),
        },
      };
    });

    setActiveFile(name);
  }, []);

  const openFileWithFetch = useCallback(
    async (name: string) => {
      const existing = filesRef.current[name];

      if (existing && existing.cells.length > 0) {
        openFile(name);
        return;
      }

      const res = await getFileData<CellType[]>(name);
      const cells: CellType[] =
        res?.data && res.data.length > 0
          ? res.data
          : [{ id: crypto.randomUUID(), content: "", isOpen: false }];

      openFile(name, cells);
    },
    [openFile]
  );

  const closeFile = useCallback(
    (name: string, saveFile: (fileName: string) => void) => {
      setActiveFile((prev) => (prev === name ? null : prev));

      const file = filesRef.current[name];
      if (!file) return;

      if (file.isDirty) {
        saveFile(name);
      }

      cleanupTimers.current[name] = setTimeout(() => {
        setFiles((prev) => {
          const copy = { ...prev };
          if (copy[name]) {
            copy[name] = { ...copy[name], cells: [], isDirty: false };
            console.log(`دیتای فایل ${name} از حافظه پاک شد`);
          }
          return copy;
        });
        delete cleanupTimers.current[name];
      }, 2000);
    },
    []
  );

  const updateCells = useCallback(
    (
      name: string,
      updater: CellType[] | ((prev: CellType[]) => CellType[])
    ) => {
      setFiles((prev) => {
        const file = prev[name];
        if (!file) return prev;
        const newCells =
          typeof updater === "function"
            ? (updater as (prev: CellType[]) => CellType[])(file.cells)
            : updater;
        return {
          ...prev,
          [name]: { ...file, cells: newCells },
        };
      });
    },
    []
  );

  const updateFileMeta: FilesContextType["updateFileMeta"] = useCallback(
    (fileName, meta) => {
      setFiles((prev) => {
        const prevFile = prev[fileName] || {
          cells: [],
          isDirty: false,
          hasLoadedOnce: false,
        };
        return {
          ...prev,
          [fileName]: { ...prevFile, ...meta },
        };
      });
    },
    []
  );

  const removeFile = useCallback((name: string) => {
    if (cleanupTimers.current[name]) {
      clearTimeout(cleanupTimers.current[name]);
      delete cleanupTimers.current[name];
    }
    setFiles((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
    setActiveFile((prev) => (prev === name ? null : prev));
  }, []);

  const contextValue = useMemo(
    () => ({
      files,
      activeFile,
      openFile,
      openFileWithFetch,
      closeFile,
      setActiveFile,
      updateCells,
      updateFileMeta,
      removeFile,
    }),
    [
      files,
      activeFile,
      openFile,
      openFileWithFetch,
      closeFile,
      setActiveFile,
      updateCells,
      updateFileMeta,
      removeFile,
    ]
  );

  return (
    <FilesContext.Provider value={contextValue}>
      {children}
    </FilesContext.Provider>
  );
}

export default memo(FilesProvider);
