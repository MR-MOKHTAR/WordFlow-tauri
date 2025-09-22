import { type Editor } from "@tiptap/react";
import { MdOutlineUndo } from "react-icons/md";
import Tooltip from "../ui/Tooltip";
import { memo, useCallback } from "react";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

function Undo({ editor }: { editor: Editor | null }) {
  const undoHandler = useCallback(() => editor?.commands.undo(), [editor]);
  return (
    <Tooltip content="Undo (Ctrl+Z)" position="bottom-end" delay={700}>
      <ButtonWithIcon
        btnSize="sm"
        icon={<MdOutlineUndo size={18} />}
        shape="md"
        onClick={undoHandler}
      />
    </Tooltip>
  );
}

export default memo(Undo);
