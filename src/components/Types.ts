import { Dispatch, SetStateAction } from "react";

export type CellType = {
  id: string;
  content: string;
  isOpen: boolean;
};

export type CellContextType = {
  cells: CellType[];
  setCells: (updater: SetStateAction<CellType[]>) => void;
  isDirty: boolean;
  hasLoadedOnce: boolean;
  setIsDirty: (val: SetStateAction<boolean>) => void;
  setHasLoadedOnce: (val: SetStateAction<boolean>) => void;
};

export type FileState = {
  name: string;
  cells: CellType[];
  isDirty: boolean;
  hasLoadedOnce: boolean;
  lastOpened: number;
};

export type FilesContextType = {
  files: Record<string, FileState>;
  activeFile: string | null;
  openFile: (name: string, cells: CellType[]) => void;
  setActiveFile: (name: string) => void;
  updateCells: (
    name: string,
    updater: CellType[] | ((prev: CellType[]) => CellType[])
  ) => void;
  updateFileMeta: (
    fileName: string,
    meta: Partial<Pick<FileState, "isDirty" | "hasLoadedOnce">>
  ) => void;
  removeFile: (name: string) => void;
  openFileWithFetch: (name: string) => void;
  closeFile: (name: string, saveFile: (fileName: string) => void) => void;
};

export type FileNameContextType = {
  fileName: string | null;
  setFileName: Dispatch<SetStateAction<string | null>>;
};

export type FontContextType = {
  fontFamily: string;
  setFontFamily: Dispatch<SetStateAction<string>>;
  fontSize: string;
  setFontSize: Dispatch<SetStateAction<string>>;
  openFontModal: boolean;
  setOpenFontModal: Dispatch<SetStateAction<boolean>>;
};

export type DeleteFileContextType = {
  openDeleteFileModal: boolean;
  setOpenDeleteFileModal: Dispatch<SetStateAction<boolean>>;
  closeFileModal: Dispatch<SetStateAction<boolean>>;
  removeFileHandler: (file: string) => void;
  selectedFile: string | null;
  setSelectedFile: Dispatch<SetStateAction<string | null>>;
};

export type RemoveCellContextType = {
  openRemoveCellModal: boolean;
  setOpenRemoveCellModal: Dispatch<SetStateAction<boolean>>;
  CellID: string | null;
  setCellID: Dispatch<SetStateAction<string | null>>;
};

export type ExportPDFContextType = {
  openExportModal: boolean;
  setOpenExportModal: Dispatch<SetStateAction<boolean>>;
  pdfPath: string;
  setPdfPath: Dispatch<SetStateAction<string>>;
  isGenerating: boolean;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  isDone: boolean;
  setIsDone: Dispatch<SetStateAction<boolean>>;
};

export type NewFileContextType = {
  openNewFileModal: boolean;
  setOpenNewFileModal: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onCreate: (fileName: string) => void;
};

export type ToastData = {
  message: string;
  type: "success" | "info" | "error";
  duration?: number;
};

export type ToastContextType = {
  isShowToast: boolean;
  setIsShowToast: Dispatch<SetStateAction<boolean>>;
  toast: ToastData;
  setToast: Dispatch<SetStateAction<ToastData>>;
};

export type ShortcutPayload =
  | { action: "save" }
  | { action: "open" }
  | { action: "newCell" };
