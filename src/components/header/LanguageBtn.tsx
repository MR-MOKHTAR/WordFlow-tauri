import { MouseEvent, useCallback, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { TbWorld } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import Tooltip from "../ui/Tooltip";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";
import { SUPPORTED_LANGUAGES } from "../i18next/i18n";

function LanguageBtn() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const currentLang = (i18n.language || "fa").split("-")[0];

  const handleSelect = useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
      handleClose();
    },
    [i18n],
  );

  return (
    <div>
      <Tooltip content={t("header.language")} position="bottom" delay={200}>
        <ButtonWithIcon
          icon={<TbWorld size={16} />}
          onClick={handleClick}
          shape="md"
          btnSize="sm"
        />
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        classes={{
          paper: "dark:bg-context-dark! dark:text-CellHeader-dark!",
        }}
      >
        {SUPPORTED_LANGUAGES.map((lng) => (
          <MenuItem
            key={lng}
            onClick={() => handleSelect(lng)}
            selected={currentLang === lng}
            className="dark:hover:bg-hover-dark! text-sm gap-2"
          >
            {t(`language.${lng}`)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default LanguageBtn;
