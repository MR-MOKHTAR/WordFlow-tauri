import { type Editor } from "@tiptap/react";
import { RiHeading } from "react-icons/ri";
import Tooltip from "../ui/Tooltip";
import { memo, MouseEvent, useCallback, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

type HeadingType = {
  level: 0 | 1 | 2 | 3 | 4;
  type: "paragraph" | "heading";
  label: string;
};
const headingLevels: HeadingType[] = [
  { label: "Normal", type: "paragraph", level: 0 },
  { label: "Heading 1", type: "heading", level: 1 },
  { label: "Heading 2", type: "heading", level: 2 },
  { label: "Heading 3", type: "heading", level: 3 },
  { label: "Heading 4", type: "heading", level: 4 },
];

function Heading({ editor }: { editor: Editor | null }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetHeading = useCallback(
    (item: HeadingType) => {
      if (item.type === "heading" && item.level !== 0) {
        editor?.chain().toggleHeading({ level: item.level }).run();
      } else {
        editor?.chain().focus().setParagraph().run();
      }
      handleClose();
    },

    [editor]
  );

  if (!editor) return null;

  return (
    <div>
      <Tooltip content="Heading" position="bottom-end" delay={700}>
        <ButtonWithIcon
          icon={<RiHeading size={18} />}
          onClick={handleClick}
          shape="md"
          btnSize="sm"
          className="mt-1"
        />
      </Tooltip>

      <Menu
        anchorEl={anchorEl} // این لازمه که منو کنار دکمه باز شه
        open={open}
        onClose={handleClose}
        dir="ltr"
        className="dark:[.MuiMenu-paper]:bg-context-dark!"
        classes={{
          paper: "dark:bg-context-dark! dark:text-CellHeader-dark!",
        }}
      >
        {headingLevels.map((item) => (
          <MenuItem
            key={item.level}
            onClick={() => handleSetHeading(item)}
            className="dark:hover:bg-hover-dark!"
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default memo(Heading);
