import { useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useCreatedNewCell from "../Hooks/useCreatedNewCell";
import useFileName from "../contexts/fileName/useFileName";
import Tooltip from "../ui/Tooltip";
import useToast from "../contexts/toast/useToast";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

function AddNewCell() {
  const { t } = useTranslation();
  const createdNewCell = useCreatedNewCell();
  const { fileName } = useFileName();
  const { setIsShowToast, setToast } = useToast();

  // ✅ متد توست ساده و مستقیم
  const showToast = useCallback(() => {
    setToast({
      message: t("toast.openOrCreateFile"),
      type: "error",
    });
    setIsShowToast(true);

    setTimeout(() => setIsShowToast(false), 3000);
  }, [t]);

  const handleClick = useCallback(() => {
    if (fileName) {
      createdNewCell();
    } else {
      showToast();
    }
  }, [createdNewCell, fileName]);

  return (
    <Tooltip content={t("header.newNote")} position="bottom">
      <ButtonWithIcon
        btnSize="sm"
        onClick={handleClick}
        shape="md"
        icon={<FaPlus size={16} />}
      />
    </Tooltip>
  );
}

export default AddNewCell;
