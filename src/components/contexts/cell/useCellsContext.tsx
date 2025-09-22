import { useContext } from "react";
import { CellContext } from "../contexts";

export function useCellsContext() {
  const CTX = useContext(CellContext);
  if (!CTX) throw new Error("CellContext must be used within CellsProvider");
  return CTX;
}
