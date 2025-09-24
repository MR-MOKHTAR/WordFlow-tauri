import { FaRegFilePdf } from "react-icons/fa";
import Tooltip from "../../ui/Tooltip";
import { useCellsContext } from "../../contexts/cell/useCellsContext";
import useExportPDF from "../../contexts/ExportPDFModal/useExportPDF";
import { useCallback } from "react";
import useFileName from "../../contexts/fileName/useFileName";
import useToast from "./../../../components/contexts/toast/useToast";
import ButtonWithIcon from "../../ui/Buttons/ButtonWithIcon";
import { invoke } from "@tauri-apps/api/core";

export default function CreatePDF() {
  const { cells } = useCellsContext();
  const {} = useExportPDF();
  const { fileName } = useFileName();
  const { setIsShowToast, setToast } = useToast();

  const exportHandler = useCallback(async () => {
    if (cells.length === 0) {
      setToast({
        type: "error",
        message: "برای ساخت PDF یک فایل را باز نمایید!",
      });
      setIsShowToast(true);
      // setTimeout(() => setIsShowToast(false), 3000);
      return;
    }

    const content = cells.map((item) => item.content).join("");

    try {
      await invoke("export_to_pdf", {
        html: content,
        fileName, // فعلاً فقط برای عنوان پنجره مفید است
      });

      setToast({
        type: "info",
        message: "درخواست ساخت PDF ارسال شد، لطفاً منتظر بمانید...",
        duration: 4000,
      });
      setIsShowToast(true);
    } catch (err) {
      console.error("PDF export error:", err);
      setToast({
        type: "error",
        message: "خطا در باز کردن پنجره ذخیره PDF",
      });
      setIsShowToast(true);
      // setTimeout(() => setIsShowToast(false), 3000);
    }
  }, [cells, fileName, setToast, setIsShowToast]);

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

/*
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

    const content = cells.map((item) => item.content);

    //* reset state before new export
    setIsError(false);
    setIsDone(false);
    setPdfPath("");

    setOpenExportModal(true);
    setIsGenerating(true);

    try {
      const res = await invoke("export_to_pdf", {
        html: content.join(""), // همون cells رو به صورت HTML بده
        fileName,
      });

      //* res همون چیزی هست که در Rust return میکنی
      setPdfPath(res as string);
      setIsDone(true);
    } catch (err) {
      console.error("PDF export error:", err);
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
*/
