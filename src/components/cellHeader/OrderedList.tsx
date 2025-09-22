import { type Editor } from "@tiptap/react";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import Tooltip from "../ui/Tooltip";
import { memo, useCallback } from "react";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

function OrderedList({ editor }: { editor: Editor | null }) {
  const orderedListHandler = useCallback(
    () => editor?.chain().focus().toggleOrderedList().run(),
    [editor]
  );
  return (
    <Tooltip content="Ordered List" position="bottom-end" delay={700}>
      <ButtonWithIcon
        btnSize="sm"
        icon={<MdOutlineFormatListNumbered size={20} />}
        onClick={orderedListHandler}
        shape="md"
      />
    </Tooltip>
  );
}

export default memo(OrderedList);
