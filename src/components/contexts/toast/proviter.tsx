import { ReactNode, useMemo, useState } from "react";
import { ToastContext } from "../contexts";
import { ToastContextType, ToastData } from "../../Types";

type Props = {
  children: ReactNode;
};

export default function ToastProvider({ children }: Props) {
  const [isShowToast, setIsShowToast] = useState(false);

  // تمام تنظیمات توست در یک state
  const [toast, setToast] = useState<ToastData>({
    message: "",
    type: "success",
  });

  const contextValue: ToastContextType = useMemo(
    () => ({
      isShowToast,
      setIsShowToast,
      toast,
      setToast,
    }),
    [isShowToast, toast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}
