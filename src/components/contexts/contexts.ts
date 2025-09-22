import { createContext } from "react";
import {
  CellContextType,
  DeleteFileContextType,
  ExportPDFContextType,
  FileNameContextType,
  FilesContextType,
  FontContextType,
  NewFileContextType,
  RemoveCellContextType,
  ToastContextType,
} from "../Types";

const FilesContext = createContext<FilesContextType | null>(null);
const CellContext = createContext<CellContextType | null>(null);
const FileNameContext = createContext<FileNameContextType | null>(null);
const FontModalContext = createContext<FontContextType | null>(null);
const DeleteFileContext = createContext<DeleteFileContextType | null>(null);
const RemoveCellContext = createContext<RemoveCellContextType | null>(null);
const ExportPDFContext = createContext<ExportPDFContextType | null>(null);
const NewFileContext = createContext<NewFileContextType | null>(null);
const ToastContext = createContext<ToastContextType | null>(null);

export {
  FilesContext,
  CellContext,
  FileNameContext,
  FontModalContext,
  DeleteFileContext,
  RemoveCellContext,
  ExportPDFContext,
  NewFileContext,
  ToastContext,
};
