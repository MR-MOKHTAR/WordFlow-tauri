import { useContext } from "react";
import { ToastContext } from "../contexts";

export default function useToast() {
  const CTX = useContext(ToastContext);
  if (!CTX) throw new Error("ToastContext must be used within CellProvider");
  return CTX;
}
