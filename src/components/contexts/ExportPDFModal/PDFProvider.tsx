import { memo, ReactNode, useMemo, useState } from "react";
import { ExportPDFContext } from "../contexts";

function PDFProvider({ children }: { children: ReactNode }) {
  const [openExportModal, setOpenExportModal] = useState(false);
  const [pdfPath, setPdfPath] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const contextValue = useMemo(
    () => ({
      openExportModal,
      setOpenExportModal,
      pdfPath,
      setPdfPath,
      isGenerating,
      setIsGenerating,
      isError,
      setIsError,
      isDone,
      setIsDone,
    }),
    [openExportModal, pdfPath, isGenerating, isError, isDone]
  );

  return (
    <ExportPDFContext.Provider value={contextValue}>
      {children}
    </ExportPDFContext.Provider>
  );
}

export default memo(PDFProvider);
