import { type Editor } from "@tiptap/react";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import Tooltip from "../ui/Tooltip";
import { memo, useCallback } from "react";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

function BulletList({ editor }: { editor: Editor | null }) {
  const bulletListHandler = useCallback(
    () => editor?.chain().focus().toggleBulletList().run(),
    [editor]
  );
  return (
    <Tooltip content="Bullet List" position="bottom-end" delay={700}>
      <ButtonWithIcon
        btnSize="sm"
        icon={<MdOutlineFormatListBulleted size={20} />}
        onClick={bulletListHandler}
        shape="md"
      />
    </Tooltip>
  );
}

export default memo(BulletList);
