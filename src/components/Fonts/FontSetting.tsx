import { AiOutlineFontSize } from "react-icons/ai";
import Tooltip from "../ui/Tooltip";
import useFont from "../contexts/FontModal/useFont";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

export default function FontSetting() {
  const { t } = useTranslation();
  const { setOpenFontModal } = useFont();
  const handleClick = useCallback(() => {
    setOpenFontModal(true);
  }, [setOpenFontModal]);

  return (
    <Tooltip content={t("header.fontSettings")} position="bottom" delay={200}>
      <ButtonWithIcon
        btnSize="sm"
        onClick={handleClick}
        shape="md"
        icon={<AiOutlineFontSize size={16} />}
      />
    </Tooltip>
  );
}
