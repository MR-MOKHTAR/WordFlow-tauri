import { useContext } from "react";
import { RemoveCellContext } from "../contexts";

export default function useRemoveCell() {
  const CTX = useContext(RemoveCellContext);
  if (!CTX) {
    throw new Error("RemoveCellContext must be used within CellsProvider");
  }
  return CTX;
}
