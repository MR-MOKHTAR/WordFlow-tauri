import { useContext } from "react";
import { FontModalContext } from "../contexts";

export default function useFont() {
  const CTX = useContext(FontModalContext);
  if (!CTX) {
    throw new Error("FontModalContext must be used within CellProvider");
  }
  return CTX;
}
