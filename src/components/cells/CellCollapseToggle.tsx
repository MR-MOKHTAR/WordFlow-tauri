import { FiMinus, FiPlus } from "react-icons/fi";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";
import { Dispatch, memo, SetStateAction, useCallback } from "react";

type propType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function CellCollapseToggle({ isOpen, setIsOpen }: propType) {
  const clickHandler = useCallback(
    () => setIsOpen((prev) => !prev),
    [setIsOpen],
  );
  return (
    <ButtonWithIcon
      icon={isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
      btnSize="sm"
      shape="md"
      onClick={clickHandler}
    />
  );
}

export default memo(CellCollapseToggle);
