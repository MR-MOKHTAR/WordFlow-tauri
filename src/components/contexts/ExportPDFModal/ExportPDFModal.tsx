import { GoCheckCircle } from "react-icons/go";
import MyModal from "../../ui/MyModal";
import useExportPDF from "./useExportPDF";
import { HiOutlineExternalLink, HiOutlineFolder } from "react-icons/hi";
import { MdReplay } from "react-icons/md";
import { HiOutlineDocument } from "react-icons/hi2";
import { memo, useCallback } from "react";
import LinearDeterminate from "./../../../components/ui/Progress";
import { MdErrorOutline } from "react-icons/md";
import UnifiedButton from "./../../../components/ui/Buttons/UnifiedButton";

function ExportPDFModal() {
  const {
    setOpenExportModal,
    pdfPath,
    isGenerating,
    isDone,
    isError,
    setIsDone,
    setIsGenerating,
    setPdfPath,
    setIsError,
  } = useExportPDF();

  const handleOpenDirectory = useCallback(() => {
    if (!pdfPath) return;
    // window.ipcRenderer.invoke("open-directory", pdfPath);
    setOpenExportModal(false);
  }, [pdfPath, setOpenExportModal]);

  const handleOpenFile = useCallback(() => {
    // window.ipcRenderer.invoke("open-pdf", pdfPath);
    setOpenExportModal(false);
  }, [pdfPath, setOpenExportModal]);

  const handleOpenFileInApp = useCallback(() => {
    // window.ipcRenderer.invoke("open-pdf-in-app", pdfPath);
    setOpenExportModal(false);
  }, [pdfPath, setOpenExportModal]);

  const closeModalHandler = useCallback(() => {
    setOpenExportModal(false);
    setIsDone(false);
    setIsGenerating(false);
    setPdfPath("");
    setIsError(false);
  }, [setOpenExportModal, setIsDone, setIsGenerating, setPdfPath, setIsError]);

  return (
    <MyModal contentSize="sm" onClose={closeModalHandler}>
      <div className="flex flex-col gap-4 w-full items-center">
        {/* آیکون وضعیت */}
        {isDone && (
          <GoCheckCircle
            className="text-green-500 animate-scale-in"
            size={40}
          />
        )}
        {isError && (
          <MdErrorOutline className="text-red-500 animate-scale-in" size={40} />
        )}

        {/* متن وضعیت */}
        <span className="text-sm text-gray-600 dark:text-gray-300 text-center">
          {isGenerating && "در حال ساخت فایل PDF..."}
          {!isGenerating && isDone && "فایل PDF با موفقیت ساخته شد."}
          {!isGenerating &&
            isError &&
            "خطا در ساخت فایل PDF. دوباره تلاش کنید."}
        </span>

        {/* محتوای پایین */}
        {isGenerating && <LinearDeterminate />}

        {isDone && !isError && (
          <div className="pt-4 flex flex-row justify-center gap-4">
            <UnifiedButton
              variant="outlined"
              color="success"
              onClick={handleOpenDirectory}
            >
              <HiOutlineFolder size={18} />
              <span>پوشه</span>
            </UnifiedButton>

            <UnifiedButton
              variant="outlined"
              color="primary"
              onClick={handleOpenFileInApp}
            >
              <HiOutlineDocument size={18} />
              <span>برنامه</span>
            </UnifiedButton>

            <UnifiedButton
              variant="outlined"
              color="secondary"
              onClick={handleOpenFile}
            >
              <HiOutlineExternalLink size={18} />
              <span>پیش‌فرض</span>
            </UnifiedButton>
          </div>
        )}

        {isError && (
          <UnifiedButton
            variant="outlined"
            color="info"
            // onClick={retry}
            onClick={() => {}}
          >
            <MdReplay size={18} />
            <span> تلاش مجدد</span>
          </UnifiedButton>
        )}
      </div>
    </MyModal>
  );
}

export default memo(ExportPDFModal);
