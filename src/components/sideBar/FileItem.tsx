import React, { useCallback } from "react";
import { GoFile, GoKebabHorizontal } from "react-icons/go";
import ContextMenu from "../ui/ContextMenu";

type FileItemProps = {
  file: string;
  isActive: boolean;
  isDirty: boolean;
  handleFileClick: (file: string) => void;
  handleMenuToggle: (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    file: string
  ) => void;
  getMenuItems: (file: string) => { label: string; action: () => void }[];
  anchorEl: HTMLElement | null;
  menuOpen: string | null;
  setMenuOpen: React.Dispatch<React.SetStateAction<string | null>>;
};

const FileItem = React.memo(
  ({
    file,
    isActive,
    isDirty,
    handleFileClick,
    handleMenuToggle,
    getMenuItems,
    anchorEl,
    menuOpen,
    setMenuOpen,
  }: FileItemProps) => {
    const onFileClick = useCallback(
      () => handleFileClick(file),
      [file, handleFileClick]
    );
    const onCloseMenu = useCallback(() => setMenuOpen(null), [setMenuOpen]);

    return (
      <li
        className={`flex-between group relative cursor-pointer py-0.5 px-1 rounded transition-colors duration-150 ${
          isActive
            ? "bg-[#E2E8F0] dark:bg-hover-dark"
            : "hover:bg-[#e2e8f0] dark:hover:bg-[#44475A]/40"
        }`}
      >
        <span
          className="flex items-center gap-x-2 flex-1 min-w-0 h-full transition-all"
          onClick={onFileClick}
        >
          <GoFile
            className={`transition-colors duration-150 ${
              isActive
                ? "text-[#BD93F9]"
                : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200"
            }`}
            size={18}
          />
          <span
            className={`line-clamp-1 block w-full min-w-0 transition-colors duration-150 ${
              isActive
                ? "text-gray-900 dark:text-gray-100 font-medium"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {file.replace(/\.json$/i, "")}
          </span>
        </span>

        <span className="relative flex items-center justify-center h-5 min-w-5">
          {isDirty && (
            <span className="size-2 rounded-full bg-[#FFB86C] group-hover:hidden" />
          )}
          <GoKebabHorizontal
            className="rotate-90 cursor-pointer shrink-0 hidden group-hover:inline-block transition-colors duration-150 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            onClick={(e) => handleMenuToggle(e, file)}
          />
        </span>

        <ContextMenu
          anchorEl={anchorEl}
          open={menuOpen === file}
          onClose={onCloseMenu}
          items={getMenuItems(file)}
        />
      </li>
    );
  }
);

export default React.memo(FileItem);
