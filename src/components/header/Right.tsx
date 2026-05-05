import { HiMinus } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { LuMaximize } from "react-icons/lu";
import { useCallback } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

const currentWindow = getCurrentWindow();

function HeaderRight() {
  const handleClose = useCallback(() => {
    currentWindow.close();
  }, []);

  const handleMaximize = useCallback(() => {
    currentWindow.toggleMaximize();
  }, []);

  const handleMinimize = useCallback(() => {
    currentWindow.minimize();
  }, []);

  return (
    <div className="flex items-center gap-1.5">
      <ButtonWithIcon
        btnSize="sm"
        shape="md"
        onClick={handleClose}
        icon={<IoCloseOutline size={16} />}
      />
      <ButtonWithIcon
        btnSize="sm"
        shape="md"
        onClick={handleMaximize}
        icon={<LuMaximize size={16} />}
      />
      <ButtonWithIcon
        btnSize="sm"
        shape="md"
        onClick={handleMinimize}
        icon={<HiMinus size={16} />}
      />
    </div>
  );
}

export default HeaderRight;
