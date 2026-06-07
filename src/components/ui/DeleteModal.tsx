import { Dispatch, SetStateAction, useCallback } from "react";
import { useTranslation } from "react-i18next";
import MyModal from "./MyModal";
import UnifiedButton from "./Buttons/UnifiedButton";

type DeleteModalProp = {
  onClose: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  title?: string;
};

function DeleteModal({ onClose, onConfirm, title }: DeleteModalProp) {
  const { t } = useTranslation();
  const onCloseHandler = useCallback(() => onClose(false), [onClose]);
  return (
    <MyModal contentSize="sm" hasXbtn={false}>
      <h2 className="text-center mb-3 font-semibold">{t("common.warning")}</h2>
      <p className="leading-relaxed text-center mb-7">
        {t("delete.message", { title })}
        <br />
        <strong> {t("delete.confirm")}</strong>
      </p>

      <div className="flex-between gap-x-3">
        <UnifiedButton onClick={onCloseHandler} color="info" variant="outlined">
          <span>{t("common.cancel")}</span>
        </UnifiedButton>
        <UnifiedButton onClick={onConfirm} color="error" variant="outlined">
          <span>{t("common.delete")}</span>
        </UnifiedButton>
      </div>
    </MyModal>
  );
}

export default DeleteModal;
