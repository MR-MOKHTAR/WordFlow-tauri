import { type Editor } from "@tiptap/react";
import { HiOutlineItalic } from "react-icons/hi2";
import Tooltip from "../ui/Tooltip";
import { memo, useCallback } from "react";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

function Italic({ editor }: { editor: Editor | null }) {
  const italicHandler = useCallback(
    () => editor?.commands.toggleItalic(),
    [editor]
  );
  return (
    <Tooltip content="Italic" position="bottom-end" delay={700}>
      <ButtonWithIcon
        btnSize="sm"
        icon={<HiOutlineItalic size={18} />}
        onClick={italicHandler}
        shape="md"
      />
    </Tooltip>
  );
}
export default memo(Italic);
