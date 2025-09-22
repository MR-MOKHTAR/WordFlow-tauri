import { memo, ReactNode, useCallback, useMemo, useState } from "react";
import { NewFileContext } from "../contexts";

import useFileName from "../fileName/useFileName";
import useCreatedNewCell from "../../Hooks/useCreatedNewCell";
import useFilesContext from "../FilesContext/useFilesContext";
import createNewFile from "../../../services/tauri/createNewFile";

function NewFileProvider({ children }: { children: ReactNode }) {
  const createFile = createNewFile();
  const { setFileName } = useFileName();
  const createdNewCell = useCreatedNewCell();
  const { openFileWithFetch } = useFilesContext();

  const [openNewFileModal, setOpenNewFileModal] = useState(false);
  const onClose = useCallback(() => setOpenNewFileModal(false), []);

  const onCreate = useCallback(
    async (fileName: string) => {
      const fullName = fileName.endsWith(".json")
        ? fileName
        : `${fileName}.json`;

      const result = await createFile(fullName);
      alert(result.err);
      if (!result) return;

      openFileWithFetch(fullName);
      // openFile(fullName, []);
      setFileName(fullName);
      createdNewCell();
      setOpenNewFileModal(false);
    },
    [createFile, setFileName, createdNewCell, openFileWithFetch]
  );

  const contextValue = useMemo(
    () => ({ openNewFileModal, setOpenNewFileModal, onClose, onCreate }),
    [openNewFileModal, setOpenNewFileModal, onClose, onCreate]
  );
  return (
    <NewFileContext.Provider value={contextValue}>
      {children}
    </NewFileContext.Provider>
  );
}

export default memo(NewFileProvider);
