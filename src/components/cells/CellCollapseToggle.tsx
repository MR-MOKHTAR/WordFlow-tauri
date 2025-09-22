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
    [setIsOpen]
  );
  return (
    <div className="absolute right-1.5 lg:right-2.5 top-0.5 z-10">
      <ButtonWithIcon
        icon={isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
        btnSize="sm"
        shape="md"
        onClick={clickHandler}
      />
    </div>
  );
}

export default memo(CellCollapseToggle);
