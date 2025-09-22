import { useContext } from "react";
import { NewFileContext } from "../contexts";

export default function useNewFile() {
  const CTX = useContext(NewFileContext);
  if (!CTX) throw new Error("NewFileContext must be used within CellProvider");
  return CTX;
}
