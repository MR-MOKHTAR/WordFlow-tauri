import { type Editor } from "@tiptap/react";
import { RiHeading } from "react-icons/ri";
import Tooltip from "../ui/Tooltip";
import { memo, MouseEvent, useCallback, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";
import { isRTL } from "../i18next/i18n";

type HeadingType = {
  level: 0 | 1 | 2 | 3 | 4;
  type: "paragraph" | "heading";
  labelKey: string;
};
const headingLevels: HeadingType[] = [
  { labelKey: "heading.normal", type: "paragraph", level: 0 },
  { labelKey: "heading.h1", type: "heading", level: 1 },
  { labelKey: "heading.h2", type: "heading", level: 2 },
  { labelKey: "heading.h3", type: "heading", level: 3 },
  { labelKey: "heading.h4", type: "heading", level: 4 },
];

function Heading({ editor }: { editor: Editor | null }) {
  const { t, i18n } = useTranslation();
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

    [editor],
  );

  if (!editor) return null;

  return (
    <div>
      <Tooltip content={t("heading.tooltip")} position="bottom-end" delay={700}>
        <ButtonWithIcon
          icon={<RiHeading size={16} />}
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
        dir={isRTL(i18n.language) ? "rtl" : "ltr"}
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
            {t(item.labelKey)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default memo(Heading);
