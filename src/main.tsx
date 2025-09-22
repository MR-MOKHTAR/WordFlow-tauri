import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import FilesProvider from "./components/contexts/FilesContext/FilesContext.tsx";
import FontProvider from "./components/contexts/FontModal/Provider.tsx";
import DeletedFileContext from "./components/contexts/DeleteFileModal/DeleteFileContext.tsx";
import NewFileProvider from "./components/contexts/newfile/Provider.tsx";
import ToastProvider from "./components/contexts/toast/proviter";
import MainFileName from "./components/contexts/fileName/MainFileName";
import CellsProvider from "./components/contexts/cell/CellsContext";
import RemoveCellProvider from "./components/contexts/cell/Remove";
import PDFProvider from "./components/contexts/ExportPDFModal/PDFProvider";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <FilesProvider>
        <MainFileName>
          <FontProvider>
            <DeletedFileContext>
              <CellsProvider>
                <RemoveCellProvider>
                  <PDFProvider>
                    <NewFileProvider>
                      <CssBaseline />
                      <App />
                    </NewFileProvider>
                  </PDFProvider>
                </RemoveCellProvider>
              </CellsProvider>
            </DeletedFileContext>
          </FontProvider>
        </MainFileName>
      </FilesProvider>
    </ToastProvider>
  </React.StrictMode>
);
