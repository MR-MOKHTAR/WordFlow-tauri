import { type Editor } from "@tiptap/react";
import { MdOutlineRedo } from "react-icons/md";
import Tooltip from "../ui/Tooltip";
import { memo, useCallback } from "react";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

type RedoProp = {
  editor: Editor | null;
};
function Redo({ editor }: RedoProp) {
  const redoHandler = useCallback(() => editor?.commands.redo(), [editor]);
  return (
    <Tooltip content="Redo (Ctrl+Y)" position="bottom-end" delay={700}>
      <ButtonWithIcon
        btnSize="sm"
        icon={<MdOutlineRedo size={18} />}
        shape="md"
        onClick={redoHandler}
      />
    </Tooltip>
  );
}

export default memo(Redo);
