import { useContext } from "react";
import { DeleteFileContext } from "../contexts";

export default function useDeleteFile() {
  const CTX = useContext(DeleteFileContext);
  if (!CTX) {
    throw new Error("DeletedFileContext must be used within CellProvider");
  }
  return CTX;
}
