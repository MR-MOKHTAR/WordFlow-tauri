import { AiOutlineFontSize } from "react-icons/ai";
import Tooltip from "../ui/Tooltip";
import useFont from "../contexts/FontModal/useFont";
import { useCallback } from "react";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

export default function FontSetting() {
  const { setOpenFontModal } = useFont();
  const handleClick = useCallback(() => {
    setOpenFontModal(true);
  }, [setOpenFontModal]);

  return (
    <Tooltip content="Font Settings" position="bottom" delay={200}>
      <ButtonWithIcon
        btnSize="md"
        onClick={handleClick}
        shape="md"
        icon={<AiOutlineFontSize size={18} />}
      />
    </Tooltip>
  );
}
