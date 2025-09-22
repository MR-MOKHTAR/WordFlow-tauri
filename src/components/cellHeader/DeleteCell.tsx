import { MdDeleteOutline } from "react-icons/md";
import Tooltip from "../ui/Tooltip";
import useRemoveCell from "../contexts/cell/useRemoveCell";
import { memo, useCallback } from "react";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

type propType = {
  cellId: string;
};

function DeleteCell({ cellId }: propType) {
  const { setCellID, setOpenRemoveCellModal } = useRemoveCell();

  const clickHandler = useCallback(() => {
    setOpenRemoveCellModal(true);
    setCellID(cellId);
  }, [setOpenRemoveCellModal, setCellID, cellId]);

  return (
    <Tooltip content="Delete Note" position="bottom-end" delay={700}>
      <ButtonWithIcon
        btnSize="sm"
        variant="delete"
        icon={<MdDeleteOutline size={18} />}
        onClick={clickHandler}
      />
    </Tooltip>
  );
}

export default memo(DeleteCell);
