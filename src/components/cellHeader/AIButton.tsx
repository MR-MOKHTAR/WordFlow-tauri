import { memo, useCallback } from "react";
import { MdOutlineAutoFixHigh } from "react-icons/md";
import Tooltip from "../ui/Tooltip";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

type AIButtonProps = {
  isActive: boolean;
  onToggle: () => void;
};

function AIButton({ isActive, onToggle }: AIButtonProps) {
  const handleClick = useCallback(() => onToggle(), [onToggle]);

  return (
    <Tooltip content="AI Assistant" position="bottom" delay={700}>
      <ButtonWithIcon
        btnSize="md"
        shape="md"
        icon={<MdOutlineAutoFixHigh size={18} />}
        onClick={handleClick}
        className={
          isActive
            ? "text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30"
            : ""
        }
      />
    </Tooltip>
  );
}

export default memo(AIButton);
