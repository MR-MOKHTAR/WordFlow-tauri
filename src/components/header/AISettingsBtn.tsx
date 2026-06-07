import { MdOutlineSmartToy } from "react-icons/md";
import Tooltip from "../ui/Tooltip";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";
import { useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { useAIModal } from "../contexts/AIModal/AIModalContext";

function AISettingsBtn() {
  const { t } = useTranslation();
  const { setOpenAISettingsModal } = useAIModal();
  const handleClick = useCallback(
    () => setOpenAISettingsModal(true),
    [setOpenAISettingsModal],
  );

  return (
    <Tooltip content={t("header.aiSettings")} position="bottom" delay={200}>
      <ButtonWithIcon
        btnSize="md"
        shape="md"
        icon={<MdOutlineSmartToy size={18} />}
        onClick={handleClick}
      />
    </Tooltip>
  );
}

export default memo(AISettingsBtn);
