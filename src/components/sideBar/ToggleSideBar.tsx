import { BsReverseLayoutSidebarReverse } from "react-icons/bs";
import { Dispatch, memo, SetStateAction, useCallback } from "react";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

type PropType = {
  setIsOpenSideBar: Dispatch<SetStateAction<boolean>>;
  isOpenSideBar?: boolean;
};

function ToggleSideBar({ setIsOpenSideBar }: PropType) {
  const showSideBarHandler = useCallback(() => {
    setIsOpenSideBar((prev) => !prev);
  }, [setIsOpenSideBar]);

  return (
    <ButtonWithIcon
      btnSize="lg"
      onClick={showSideBarHandler}
      icon={<BsReverseLayoutSidebarReverse size={20} />}
      shape="md"
    />
  );
}

export default memo(ToggleSideBar);
