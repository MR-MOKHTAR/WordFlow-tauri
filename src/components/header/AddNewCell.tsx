import { useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import useCreatedNewCell from "../Hooks/useCreatedNewCell";
import useFileName from "../contexts/fileName/useFileName";
import Tooltip from "../ui/Tooltip";
import useToast from "../contexts/toast/useToast";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

function AddNewCell() {
  const createdNewCell = useCreatedNewCell();
  const { fileName } = useFileName();
  const { setIsShowToast, setToast } = useToast();

  // ✅ متد توست ساده و مستقیم
  const showToast = useCallback(() => {
    setToast({
      message: "لطفاً! یک فایل باز کنید یا فایل جدید بسازید!",
      type: "error",
    });
    setIsShowToast(true);

    setTimeout(() => setIsShowToast(false), 3000);
  }, []);

  const handleClick = useCallback(() => {
    if (fileName) {
      createdNewCell();
    } else {
      showToast();
    }
  }, [createdNewCell, fileName]);

  return (
    <Tooltip content="New Note (Ctrl+N)" position="bottom">
      <ButtonWithIcon
        btnSize="md"
        onClick={handleClick}
        shape="md"
        icon={<FaPlus size={18} />}
      />
    </Tooltip>
  );
}

export default AddNewCell;
