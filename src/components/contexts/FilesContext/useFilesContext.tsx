import { useContext } from "react";
import { FilesContext } from "../contexts";

export default function useFilesContext() {
  const ctx = useContext(FilesContext);
  if (!ctx)
    throw new Error("useFilesContext must be used within FilesProvider");
  return ctx;
}
