import { useContext } from "react";
import { FileNameContext } from "../contexts";

export default function useFileName() {
  const fileNameCTC = useContext(FileNameContext);
  if (!fileNameCTC)
    throw new Error("FileNameContext must be used within CellProvider");
  return fileNameCTC;
}
