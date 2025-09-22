import { MouseEvent, useCallback, useState } from "react";
import useFilesContext from "../contexts/FilesContext/useFilesContext";
import useFileName from "../contexts/fileName/useFileName";
import useSaveFile from "../SaveFile/useSaveFile";
import useDeleteFile from "../contexts/DeleteFileModal/useDeleteFile";
import FileItem from "./FileItem";

export default function ListFiles() {
  const saveFile = useSaveFile({ mode: "debounce", debounceDelay: 500 });
  const { fileName, setFileName } = useFileName();
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { files, activeFile, closeFile, openFileWithFetch } = useFilesContext();
  const { setSelectedFile, setOpenDeleteFileModal } = useDeleteFile();

  const handleMenuToggle = useCallback(
    (e: MouseEvent<SVGElement, globalThis.MouseEvent>, file: string) => {
      e.stopPropagation();
      setAnchorEl(e.currentTarget as unknown as HTMLElement);
      setMenuOpen((prev) => (prev === file ? null : file));
    },
    []
  );

  const handleFileClick = useCallback(
    async (file: string) => {
      const prevFile = activeFile;

      await openFileWithFetch(file);
      setFileName(file);

      if (prevFile && files[prevFile]?.isDirty) {
        closeFile(prevFile, saveFile);
      }
    },
    [activeFile, files, openFileWithFetch, setFileName, closeFile, saveFile]
  );

  const getMenuItems = useCallback(
    (file: string) => [
      {
        label: "تغییر نام",
        action: () => console.log("rename", file),
      },
      {
        label: "حذف",
        action: () => {
          setSelectedFile(file);
          setOpenDeleteFileModal(true);
        },
      },
    ],
    [setSelectedFile, setOpenDeleteFileModal]
  );

  return (
    <div className="pt-2">
      <ul className="space-y-0.5">
        {Object.keys(files).map((file) => (
          <FileItem
            key={file}
            file={file}
            isActive={file === fileName}
            isDirty={files[file].isDirty}
            handleFileClick={handleFileClick}
            handleMenuToggle={(e) => handleMenuToggle(e, file)}
            getMenuItems={getMenuItems}
            anchorEl={anchorEl}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        ))}
      </ul>
    </div>
  );
}
