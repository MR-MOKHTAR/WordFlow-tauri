import { memo } from "react";
import clsx from "clsx";

type ButtonVariant = "default" | "delete" | "success";

interface ButtonWithIconProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  btnSize?: "sm" | "md" | "lg";
  shape?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: ButtonVariant;
  icon: React.ReactNode;
  className?: string;
}

const ButtonWithIcon = memo(function ButtonWithIcon({
  onClick,
  btnSize = "md",
  shape = "md",
  variant = "default",
  icon,
  className,
}: ButtonWithIconProps) {
  // ابعاد
  const sizeMap = {
    sm: "w-[26px] h-[26px]",
    md: "w-[30px] h-[30px]",
    lg: "w-[36px] h-[36px]",
  };

  // گردی
  const radiusMap = {
    sm: "rounded-[4px]",
    md: "rounded-[6px]",
    lg: "rounded-[8px]",
    xl: "rounded-[12px]",
    full: "rounded-full",
  };

  // رنگ‌ها
  const variantMap: Record<ButtonVariant, string> = {
    default: clsx(
      "text-gray-800 dark:text-gray-200",
      "hover:bg-gray-200 dark:hover:bg-gray-700",
      "hover:text-gray-900 dark:hover:text-white"
    ),
    delete: clsx(
      "text-red-900 dark:text-red-400",
      "hover:bg-red-100 dark:hover:bg-red-900/30",
      "hover:text-red-800 dark:hover:text-red-200"
    ),
    success: clsx(
      "text-green-700 dark:text-green-400",
      "hover:bg-green-100 dark:hover:bg-green-900/30",
      "hover:text-green-800 dark:hover:text-green-200"
    ),
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center cursor-pointer",
        "transition-all duration-200 ease-in-out",
        "active:scale-90", // افکت کلیک
        sizeMap[btnSize],
        radiusMap[shape],
        variantMap[variant],
        className
      )}
    >
      {icon}
    </button>
  );
});

export default ButtonWithIcon;
