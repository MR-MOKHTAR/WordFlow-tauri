import { memo, ReactNode, useCallback, useMemo, useState } from "react";
import { NewFileContext } from "../contexts";

import useFileName from "../fileName/useFileName";
import useFilesContext from "../FilesContext/useFilesContext";
import { createNote } from "../../../services/db/notesRepo";
import i18n from "../../i18next/i18n";

function NewFileProvider({ children }: { children: ReactNode }) {
  const { setFileName } = useFileName();
  const { openFileWithFetch } = useFilesContext();

  const [openNewFileModal, setOpenNewFileModal] = useState(false);
  const onClose = useCallback(() => setOpenNewFileModal(false), []);

  const onCreate = useCallback(
    async (fileName: string) => {
      const name = fileName.trim().replace(/\.json$/i, "");
      if (!name) return;

      const result = await createNote(name);
      if (!result.success) {
        alert(result.error ?? i18n.t("toast.fileCreateError"));
        return;
      }

      setFileName(name);
      await openFileWithFetch(name);
      setOpenNewFileModal(false);
    },
    [setFileName, openFileWithFetch]
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
