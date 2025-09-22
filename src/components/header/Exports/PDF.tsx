import { FaRegFilePdf } from "react-icons/fa";
import Tooltip from "../../ui/Tooltip";
import { useCellsContext } from "../../contexts/cell/useCellsContext";
import useExportPDF from "../../contexts/ExportPDFModal/useExportPDF";
import { useCallback } from "react";
import useFileName from "../../contexts/fileName/useFileName";
import useToast from "./../../../components/contexts/toast/useToast";
import ButtonWithIcon from "../../ui/Buttons/ButtonWithIcon";

export default function CreatePDF() {
  const { cells } = useCellsContext();
  const {
    setOpenExportModal,
    setPdfPath,
    setIsGenerating,
    setIsError,
    setIsDone,
  } = useExportPDF();
  const { fileName } = useFileName();
  const { setIsShowToast, setToast } = useToast();

  const exportHandler = useCallback(async () => {
    if (cells.length === 0) {
      setToast({
        type: "error",
        message: "برای ساخت PDF یک فایل را باز نمایید!",
      });
      setIsShowToast(true);
      setTimeout(() => setIsShowToast(false), 3000);
      return;
    }

    // const content = cells.map((item) => item.content);

    // reset state before new export
    setIsError(false);
    setIsDone(false);
    setPdfPath("");

    setOpenExportModal(true);
    setIsGenerating(true);

    try {
      // const res = await window.ipcRenderer.invoke("export-to-pdf", {
      //   content,
      //   fileName,
      // });
      // if (res?.success) {
      //   setPdfPath(res.path);
      //   setIsDone(true);
      // } else {
      //   setIsError(true);
      // }
    } catch {
      setIsError(true);
    } finally {
      setIsGenerating(false);
    }
  }, [
    cells,
    setOpenExportModal,
    setPdfPath,
    setIsGenerating,
    fileName,
    setIsError,
    setIsDone,
    setIsShowToast,
    setToast,
  ]);

  return (
    <Tooltip content="Export PDF">
      <ButtonWithIcon
        btnSize="md"
        onClick={exportHandler}
        shape="md"
        icon={<FaRegFilePdf size={18} />}
      />
    </Tooltip>
  );
}
