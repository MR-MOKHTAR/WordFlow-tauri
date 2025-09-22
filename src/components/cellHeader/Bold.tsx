import { type Editor } from "@tiptap/react";
import { HiOutlineBold } from "react-icons/hi2";
import Tooltip from "../ui/Tooltip";
import { memo, useCallback } from "react";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

function Bold({ editor }: { editor: Editor | null }) {
  const boldHandler = useCallback(
    () => editor?.commands.toggleBold(),
    [editor]
  );
  return (
    <Tooltip content="Bold" position="bottom-end" delay={700}>
      <ButtonWithIcon
        btnSize="sm"
        icon={<HiOutlineBold size={18} />}
        onClick={boldHandler}
        shape="md"
      />
    </Tooltip>
  );
}
export default memo(Bold);
