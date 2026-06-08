import { MouseEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import useFilesContext from "../contexts/FilesContext/useFilesContext";
import useFileName from "../contexts/fileName/useFileName";
import useDeleteFile from "../contexts/DeleteFileModal/useDeleteFile";
import useToast from "../contexts/toast/useToast";
import useSaveFile from "../SaveFile/useSaveFile";
import { renameNote } from "../../services/db/notesRepo";
import FileItem from "./FileItem";

export default function ListFiles() {
  const { t } = useTranslation();
  const saveFile = useSaveFile({ mode: "debounce", debounceDelay: 500 });
  const { fileName, setFileName } = useFileName();
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [renamingFile, setRenamingFile] = useState<string | null>(null);

  const { files, activeFile, closeFile, openFileWithFetch, renameFile } =
    useFilesContext();
  const { setSelectedFile, setOpenDeleteFileModal } = useDeleteFile();
  const { setToast, setIsShowToast } = useToast();

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type });
      setIsShowToast(true);
      setTimeout(() => setIsShowToast(false), 3000);
    },
    [setToast, setIsShowToast],
  );

  const handleFileClick = useCallback(
    async (file: string) => {
      const prevFile = activeFile;
      setFileName(file);

      // فایل قبلی را (در صورت تغییر) ببند تا ذخیره و حافظه‌اش آزاد شود
      if (prevFile && prevFile !== file && files[prevFile]?.isDirty) {
        closeFile(prevFile, saveFile);
      }

      await openFileWithFetch(file);
    },
    [activeFile, files, openFileWithFetch, setFileName, closeFile, saveFile],
  );

  // کلیک روی سه‌نقطه‌ی گوشه
  const handleMenuToggle = useCallback(
    (e: MouseEvent<SVGElement, globalThis.MouseEvent>, file: string) => {
      e.stopPropagation();
      setAnchorEl(e.currentTarget as unknown as HTMLElement);
      setMenuPos(null);
      setMenuOpen((prev) => (prev === file ? null : file));
    },
    [],
  );

  // راست‌کلیک روی خود آیتم → منو در محل نشانگر
  const handleContextMenu = useCallback(
    (e: MouseEvent<HTMLLIElement>, file: string) => {
      e.preventDefault();
      e.stopPropagation();
      setMenuPos({ x: e.clientX, y: e.clientY });
      setAnchorEl(null);
      setMenuOpen(file);
    },
    [],
  );

  const commitRename = useCallback(
    async (oldName: string, rawName: string) => {
      setRenamingFile(null);
      const newName = rawName.trim().replace(/\.json$/i, "");
      if (!newName || newName === oldName) return;
      if (files[newName]) {
        showToast(t("toast.fileExists"), "error");
        return;
      }

      const res = await renameNote(oldName, newName);
      if (!res.success) {
        showToast(res.error || t("toast.fileCreateError"), "error");
        return;
      }
      renameFile(oldName, newName);
      if (fileName === oldName) setFileName(newName);
      showToast(t("toast.fileRenamed", { name: newName }), "success");
    },
    [files, fileName, renameFile, setFileName, showToast, t],
  );

  const cancelRename = useCallback(() => setRenamingFile(null), []);

  const getMenuItems = useCallback(
    (file: string) => [
      {
        label: t("contextMenu.rename"),
        icon: <LuPencil />,
        action: () => setRenamingFile(file),
      },
      {
        label: t("contextMenu.delete"),
        icon: <LuTrash2 />,
        danger: true,
        action: () => {
          setSelectedFile(file);
          setOpenDeleteFileModal(true);
        },
      },
    ],
    [t, setSelectedFile, setOpenDeleteFileModal],
  );

  return (
    <div className="pt-2 px-0.5">
      <ul className="space-y-0.5">
        {Object.keys(files).map((file) => (
          <FileItem
            key={file}
            file={file}
            isActive={file === fileName}
            isDirty={files[file].isDirty}
            isRenaming={renamingFile === file}
            handleFileClick={handleFileClick}
            handleMenuToggle={(e) => handleMenuToggle(e, file)}
            handleContextMenu={handleContextMenu}
            onCommitRename={commitRename}
            onCancelRename={cancelRename}
            getMenuItems={getMenuItems}
            anchorEl={anchorEl}
            menuPos={menuPos}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        ))}
      </ul>
    </div>
  );
}
