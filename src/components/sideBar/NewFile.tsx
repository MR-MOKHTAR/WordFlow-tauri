import { useCallback } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import Tooltip from "../ui/Tooltip";
import useNewFile from "../contexts/newfile/useNewFile";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

export default function AddNewFile() {
  const { setOpenNewFileModal } = useNewFile();
  const handleOpenModal = useCallback(
    () => setOpenNewFileModal(true),
    [setOpenNewFileModal]
  );

  return (
    <Tooltip content="New File" position="left">
      <ButtonWithIcon
        btnSize="lg"
        icon={<AiOutlineFileAdd size={20} />}
        onClick={handleOpenModal}
        shape="md"
      />
    </Tooltip>
  );
}
