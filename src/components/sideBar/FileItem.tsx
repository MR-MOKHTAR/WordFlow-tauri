import React, { useCallback } from "react";
import { LuFileText } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import ContextMenu, { type MenuItem } from "../ui/ContextMenu";

type FileItemProps = {
  file: string;
  isActive: boolean;
  isDirty: boolean;
  isRenaming: boolean;
  handleFileClick: (file: string) => void;
  handleMenuToggle: (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    file: string,
  ) => void;
  handleContextMenu: (e: React.MouseEvent<HTMLLIElement>, file: string) => void;
  onCommitRename: (oldName: string, newName: string) => void;
  onCancelRename: () => void;
  getMenuItems: (file: string) => MenuItem[];
  anchorEl: HTMLElement | null;
  menuPos: { x: number; y: number } | null;
  menuOpen: string | null;
  setMenuOpen: React.Dispatch<React.SetStateAction<string | null>>;
};

const FileItem = React.memo(
  ({
    file,
    isActive,
    isDirty,
    isRenaming,
    handleFileClick,
    handleMenuToggle,
    handleContextMenu,
    onCommitRename,
    onCancelRename,
    getMenuItems,
    anchorEl,
    menuPos,
    menuOpen,
    setMenuOpen,
  }: FileItemProps) => {
    const onFileClick = useCallback(() => {
      if (!isRenaming) handleFileClick(file);
    }, [file, handleFileClick, isRenaming]);

    const onCloseMenu = useCallback(() => setMenuOpen(null), [setMenuOpen]);

    const onContextMenu = useCallback(
      (e: React.MouseEvent<HTMLLIElement>) => {
        if (isRenaming) return;
        handleContextMenu(e, file);
      },
      [file, handleContextMenu, isRenaming],
    );

    const onRenameKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (e.key === "Enter") onCommitRename(file, e.currentTarget.value);
        else if (e.key === "Escape") onCancelRename();
      },
      [file, onCommitRename, onCancelRename],
    );

    return (
      <li
        onClick={onFileClick}
        onContextMenu={onContextMenu}
        className={`flex-between group relative cursor-pointer py-1.5 px-2 rounded-md transition-colors duration-150 ${
          isActive
            ? "bg-[#E2E8F0] dark:bg-hover-dark"
            : "hover:bg-[#e2e8f0] dark:hover:bg-[#44475A]/40"
        }`}
      >
        <div className="flex items-center gap-x-2 flex-1 min-w-0 h-full overflow-hidden">
          <LuFileText
            className={`shrink-0 transition-colors duration-150 ${
              isActive
                ? "text-[#BD93F9]"
                : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200"
            }`}
            size={16}
          />

          {isRenaming ? (
            <input
              autoFocus
              defaultValue={file}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={onRenameKeyDown}
              onBlur={(e) => onCommitRename(file, e.currentTarget.value)}
              onFocus={(e) => e.currentTarget.select()}
              className="block w-full min-w-0 text-sm bg-white dark:bg-[#1e1f29] text-gray-900 dark:text-gray-100 border border-primary-light/70 rounded px-1.5 py-0.5 outline-none focus:ring-2 focus:ring-primary-light/40"
            />
          ) : (
            <span
              className={`block w-full min-w-0 truncate text-sm transition-colors duration-150 ${
                isActive
                  ? "text-gray-900 dark:text-gray-100 font-medium"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {file}
            </span>
          )}
        </div>

        {!isRenaming && (
          <span className="relative flex items-center justify-center h-5 min-w-5 shrink-0">
            {isDirty && <span className="dirty-dot group-hover:hidden" />}
            <FiMoreHorizontal
              className="cursor-pointer shrink-0 hidden group-hover:inline-block transition-colors duration-150 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200"
              size={16}
              onClick={(e) => handleMenuToggle(e, file)}
            />
          </span>
        )}

        <ContextMenu
          anchorEl={anchorEl}
          anchorPosition={menuPos}
          open={menuOpen === file}
          onClose={onCloseMenu}
          items={getMenuItems(file)}
        />
      </li>
    );
  },
);

FileItem.displayName = "FileItem";

export default FileItem;
