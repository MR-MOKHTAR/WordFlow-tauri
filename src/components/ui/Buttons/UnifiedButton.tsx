import { memo, ReactNode } from "react";
import { Button, ButtonProps } from "@mui/material";

interface UnifiedButtonCustomProps extends ButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UnifiedButton = memo(function UnifiedButton(
  props: UnifiedButtonCustomProps
) {
  const {
    onClick,
    size = "medium",
    className,
    color,
    children,
    sx,
    startIcon,
    endIcon,
    variant,
    ...rest
  } = props;

  // دکمه متنی
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      color={color}
      className={`font-semibold flex items-center justify-center gap-x-2.5 ${className}`}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={sx}
      {...(rest as ButtonProps)}
    >
      {children}
    </Button>
  );
});

export default UnifiedButton;
