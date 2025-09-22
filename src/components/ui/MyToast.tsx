import useToast from "../contexts/toast/useToast";
import { MdCheckCircleOutline, MdOutlineDangerous } from "react-icons/md";
import { memo } from "react";
import clsx from "clsx";

function Toast() {
  const { isShowToast, toast } = useToast();

  if (!isShowToast) return null;

  const iconMap = {
    success: <MdCheckCircleOutline className="text-green-500" size={20} />,
    error: <MdOutlineDangerous className="text-red-500" size={20} />,
  };

  return (
    <div
      className={clsx(
        "fixed z-[1111] top-14 left-6 flex items-center gap-2 pl-4 pr-3 py-2 rounded-lg shadow-lg border text-sm font-medium transition-all duration-300",
        toast.type === "success"
          ? "bg-green-50 border-green-400 text-green-700 dark:bg-green-900/20 dark:text-green-300"
          : "bg-red-50 border-red-400 text-red-700 dark:bg-red-900/20 dark:text-red-300"
      )}
    >
      {iconMap[toast.type || "success"]}
      <span>{toast.message}</span>
    </div>
  );
}

export default memo(Toast);
