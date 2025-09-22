import useFont from "../contexts/FontModal/useFont";
import FontModal from "../Fonts/FontModal";
import DeleteModal from "./DeleteModal";
import useDeleteFile from "../contexts/DeleteFileModal/useDeleteFile";
import useRemoveCell from "../contexts/cell/useRemoveCell";
import { useCellsContext } from "../contexts/cell/useCellsContext";
import useSaveFile from "../SaveFile/useSaveFile";
import React, { useCallback } from "react";
import useExportPDF from "../contexts/ExportPDFModal/useExportPDF";
import ExportPDFModal from "../contexts/ExportPDFModal/ExportPDFModal";
import NewFileModal from "./NewFileModal";
import useNewFile from "../contexts/newfile/useNewFile";
import useFilesContext from "../contexts/FilesContext/useFilesContext";

function ShowModals() {
  const { openFontModal } = useFont();
  const {
    openDeleteFileModal,
    closeFileModal,
    selectedFile,
    removeFileHandler,
  } = useDeleteFile();
  const { openRemoveCellModal, setOpenRemoveCellModal, CellID } =
    useRemoveCell();
  const { setCells } = useCellsContext();
  const { activeFile } = useFilesContext();

  const saveFile = useSaveFile({
    mode: "instant",
    debounceDelay: 1000,
  });

  const { openNewFileModal } = useNewFile();

  const removeCellHandler = useCallback(
    (cellId: string) => {
      setCells((prev) => {
        const newCells = prev.filter((cell) => cell.id !== cellId);
        return newCells;
      });

      if (activeFile) saveFile(activeFile);

      localStorage.removeItem(cellId);
    },
    [saveFile, setCells]
  );

  const { openExportModal } = useExportPDF();
  return (
    <div>
      {openFontModal && <FontModal />}
      {openDeleteFileModal && (
        <DeleteModal
          title="فایل"
          onClose={closeFileModal}
          onConfirm={() => {
            if (selectedFile) removeFileHandler(selectedFile);
          }}
        />
      )}
      {openRemoveCellModal && (
        <DeleteModal
          title="یادداشت"
          onClose={() => setOpenRemoveCellModal(false)}
          onConfirm={() => {
            if (CellID) removeCellHandler(CellID);
            setOpenRemoveCellModal(false);
          }}
        />
      )}
      {openExportModal && <ExportPDFModal />}
      {openNewFileModal && <NewFileModal />}
    </div>
  );
}

export default React.memo(ShowModals);
