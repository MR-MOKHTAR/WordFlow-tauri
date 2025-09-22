import { IconType } from "react-icons";
import { useState } from "react";

type InputProps = {
  placeholder?: string;
  iconLeft?: IconType;
  iconRight?: IconType;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  fullWidth?: boolean;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function MyInput({
  placeholder = "Type here...",
  iconLeft: IconLeft,
  iconRight: IconRight,
  size = "md",
  variant = "primary",
  disabled = false,
  fullWidth = false,
  type = "text",
  value,
  onChange,
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const sizes = {
    xs: "text-xs px-2 py-1 h-7",
    sm: "text-sm px-2.5 py-1.5 h-8",
    md: "text-base px-3 py-2 h-10",
    lg: "text-lg px-3.5 py-2.5 h-12",
  };

  const variants = {
    primary:
      "border-violet-500 focus:border-violet-400 focus:shadow-[0_0_8px_rgba(139,92,246,0.6)]",
    secondary:
      "border-gray-500 focus:border-gray-400 focus:shadow-[0_0_8px_rgba(156,163,175,0.6)]",
    danger:
      "border-red-500 focus:border-red-400 focus:shadow-[0_0_8px_rgba(239,68,68,0.6)]",
    ghost:
      "border-gray-600 focus:border-gray-400 focus:shadow-[0_0_8px_rgba(75,85,99,0.6)] bg-transparent",
  };

  return (
    <div
      className={`
        relative flex items-center gap-2 border border-primary/25! rounded-md transition-all duration-200 bg-gray- text-gray-100
        ${sizes[size]}
        ${variants[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${fullWidth ? "w-full" : "w-fit"}
      `}
    >
      {IconLeft && (
        <IconLeft
          size={18}
          className=" text-gray-400 group-focus-within:text-white transition-colors duration-200"
        />
      )}

      <input
        type={type}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={`
          bg-transparent outline-none w-full placeholder-gray-500 transition-all duration-200
        `}
      />

      {/* انیمیشن زیر خط وقتی فوکوس می‌کنی */}
      <span
        className={`bg-purple-800 absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 ${
          focused ? "w-full" : "w-0"
        }`}
      ></span>

      {IconRight && (
        <IconRight
          size={18}
          className="text-gray-400 group-focus-within:text-white transition-colors duration-200"
        />
      )}
    </div>
  );
}

export default MyInput;
