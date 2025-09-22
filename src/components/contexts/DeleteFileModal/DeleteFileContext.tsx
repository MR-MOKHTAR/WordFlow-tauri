import { FC, memo, ReactNode, useCallback, useMemo, useState } from "react";
import { DeleteFileContext } from "../contexts";
import useFilesContext from "../FilesContext/useFilesContext";
import useFileName from "../fileName/useFileName";
import useToast from "../toast/useToast";
import deleteFile from "../../../services/tauri/deleteFile";

type PropsType = {
  children: ReactNode;
};

const DeletedFileContext: FC<PropsType> = ({ children }) => {
  const [openDeleteFileModal, setOpenDeleteFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { removeFile, activeFile, files } = useFilesContext();
  const { setFileName } = useFileName();
  const { setIsShowToast, setToast } = useToast();

  const closeFileModal = useCallback(() => setOpenDeleteFileModal(false), []);

  const removeFileHandler = useCallback(
    async (file: string) => {
      closeFileModal();

      const cellIDS = files[file]?.cells?.map((cell) => cell.id) || [];

      try {
        const res = await deleteFile(file);

        if (res?.success) {
          // حذف فایل از state
          removeFile(file);
          if (file === activeFile) {
            setFileName(null);
          }

          // Toast موفقیت
          setToast({
            message: res.message as string,
            type: "success",
          });
          setIsShowToast(true);

          setTimeout(() => setIsShowToast(false), 3000);

          // حذف سلول‌های باز از localStorage
          for (const id of cellIDS) {
            localStorage.removeItem(id);
          }
        } else {
          // Toast خطا (error برمی‌گرده)
          setToast({
            message: res?.error || "خطا در حذف فایل!",
            type: "error",
          });
          setIsShowToast(true);
          setTimeout(() => setIsShowToast(false), 3000);
        }
      } catch (err) {
        // خطای غیرمنتظره (مثلاً ipc کار نکرد)
        setToast({
          message: "ارتباط با سیستم حذف فایل برقرار نشد!",
          type: "error",
        });
        setIsShowToast(true);
        setTimeout(() => setIsShowToast(false), 3000);
      }
    },
    [
      removeFile,
      closeFileModal,
      activeFile,
      setFileName,
      files,
      setIsShowToast,
      setToast,
    ]
  );

  const value = useMemo(
    () => ({
      openDeleteFileModal,
      setOpenDeleteFileModal,
      closeFileModal,
      removeFileHandler,
      selectedFile,
      setSelectedFile,
    }),
    [openDeleteFileModal, closeFileModal, removeFileHandler, selectedFile]
  );

  return (
    <DeleteFileContext.Provider value={value}>
      {children}
    </DeleteFileContext.Provider>
  );
};

export default memo(DeletedFileContext);
