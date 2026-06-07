import { type Editor } from "@tiptap/react";
import { memo, MouseEvent, useCallback, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import {
  RiAlignRight,
  RiAlignCenter,
  RiAlignLeft,
  RiAlignJustify,
} from "react-icons/ri";
import { useTranslation } from "react-i18next";
import Tooltip from "../ui/Tooltip";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";
import { isRTL } from "../i18next/i18n";

type AlignOption = {
  labelKey: string;
  value: "right" | "center" | "left" | "justify";
  icon: React.ReactNode;
};

const alignOptions: AlignOption[] = [
  { labelKey: "align.right", value: "right", icon: <RiAlignRight size={16} /> },
  { labelKey: "align.center", value: "center", icon: <RiAlignCenter size={16} /> },
  { labelKey: "align.left", value: "left", icon: <RiAlignLeft size={16} /> },
  { labelKey: "align.justify", value: "justify", icon: <RiAlignJustify size={16} /> },
];

function TextAlign({ editor }: { editor: Editor | null }) {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSetAlign = useCallback(
    (align: AlignOption["value"]) => {
      editor?.chain().focus().setTextAlign(align).run();
      handleClose();
    },
    [editor],
  );

  // آیکون فعلی بر اساس alignment انتخاب شده
  const currentIcon = (() => {
    if (editor?.isActive({ textAlign: "center" }))
      return <RiAlignCenter size={16} />;
    if (editor?.isActive({ textAlign: "left" }))
      return <RiAlignLeft size={16} />;
    if (editor?.isActive({ textAlign: "justify" }))
      return <RiAlignJustify size={16} />;
    return <RiAlignRight size={16} />; // پیش‌فرض راست (RTL)
  })();

  if (!editor) return null;

  return (
    <div>
      <Tooltip content={t("align.tooltip")} position="bottom-end" delay={700}>
        <ButtonWithIcon
          icon={currentIcon}
          onClick={handleClick}
          shape="md"
          btnSize="sm"
        />
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        dir={isRTL(i18n.language) ? "rtl" : "ltr"}
        classes={{
          paper: "dark:bg-context-dark! dark:text-CellHeader-dark!",
        }}
      >
        {alignOptions.map((opt) => (
          <MenuItem
            key={opt.value}
            onClick={() => handleSetAlign(opt.value)}
            selected={editor.isActive({ textAlign: opt.value })}
            className="dark:hover:bg-hover-dark! gap-3"
          >
            <span className="flex items-center gap-2 text-sm">
              {opt.icon}
              {t(opt.labelKey)}
            </span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default memo(TextAlign);
