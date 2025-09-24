import useToast from "../contexts/toast/useToast";
import {
  MdCheckCircleOutline,
  MdOutlineDangerous,
  MdInfoOutline,
} from "react-icons/md";
import { memo, useEffect } from "react";
import clsx from "clsx";

function Toast() {
  const { isShowToast, setIsShowToast, toast } = useToast();

  if (!isShowToast) return null;

  const iconMap = {
    success: <MdCheckCircleOutline className="text-green-500" size={20} />,
    error: <MdOutlineDangerous className="text-red-500" size={20} />,
    info: <MdInfoOutline className="text-blue-500" size={20} />,
  };

  useEffect(() => {
    if (!isShowToast) return;

    const timer = setTimeout(() => {
      setIsShowToast(false);
    }, toast.duration ?? 3000);

    return () => clearTimeout(timer); // جلوگیری از تایم‌اوت‌های تکراری
  }, [isShowToast, setIsShowToast]);

  return (
    <div
      className={clsx(
        "fixed z-[1111] top-14 left-6 flex items-center gap-2 pl-4 pr-3 py-2 rounded-lg shadow-lg border text-sm font-medium transition-all duration-300",
        toast.type === "success"
          ? "bg-green-50 border-green-400 text-green-700 dark:bg-green-900/20 dark:text-green-300"
          : toast.type === "error"
          ? "bg-red-50 border-red-400 text-red-700 dark:bg-red-900/20 dark:text-red-300"
          : "bg-blue-50 border-blue-400 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
      )}
    >
      {iconMap[toast.type || "success"]}
      <span>{toast.message}</span>
    </div>
  );
}

export default memo(Toast);
