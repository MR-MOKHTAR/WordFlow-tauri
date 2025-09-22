import { ReactNode, useCallback, useMemo } from "react";
import { CellContext } from "../contexts";
import useFilesContext from "../FilesContext/useFilesContext";
import { CellContextType, CellType } from "../../Types";

function CellsProvider({ children }: { children: ReactNode }) {
  const { files, activeFile, updateCells, updateFileMeta } = useFilesContext();
  const file = activeFile ? files[activeFile] : null;

  const setCellsWrapper = useCallback(
    (updater: React.SetStateAction<CellType[]>) => {
      if (!activeFile) return;
      updateCells(activeFile, updater);
    },
    [activeFile, updateCells]
  );

  const setIsDirtyWrapper = useCallback(
    (val: React.SetStateAction<boolean>) => {
      if (!activeFile) return;
      updateFileMeta(activeFile, {
        isDirty: val instanceof Function ? val(file?.isDirty || false) : val,
      });
    },
    [activeFile, updateFileMeta, file?.isDirty]
  );

  const setHasLoadedOnceWrapper = useCallback(
    (val: React.SetStateAction<boolean>) => {
      if (!activeFile) return;
      updateFileMeta(activeFile, {
        hasLoadedOnce:
          val instanceof Function ? val(file?.hasLoadedOnce || false) : val,
      });
    },
    [activeFile, file?.hasLoadedOnce, updateFileMeta]
  );

  const contextValue: CellContextType = useMemo(
    () => ({
      cells: file?.cells || [],
      setCells: setCellsWrapper,
      isDirty: file?.isDirty || false,
      hasLoadedOnce: file?.hasLoadedOnce || false,
      setIsDirty: setIsDirtyWrapper,
      setHasLoadedOnce: setHasLoadedOnceWrapper,
    }),
    [
      file?.cells,
      file?.isDirty,
      file?.hasLoadedOnce,
      setCellsWrapper,
      setIsDirtyWrapper,
      setHasLoadedOnceWrapper,
    ]
  );

  return (
    <CellContext.Provider value={contextValue}>{children}</CellContext.Provider>
  );
}

export default CellsProvider;
