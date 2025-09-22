import { useContext } from "react";
import { ExportPDFContext } from "../contexts";

export default function useExportPDF() {
  const CTX = useContext(ExportPDFContext);
  if (!CTX) {
    throw new Error("ExportPDFContext must be used within CellProvider");
  }
  return CTX;
}
