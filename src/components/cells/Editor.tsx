import { Virtuoso } from "react-virtuoso";
import CellWrapper from "./CellWrapper";
import CellTitleBar from "./CellTitleBar";
import { useCellsContext } from "../contexts/cell/useCellsContext";
import useCreatedNewCell from "../Hooks/useCreatedNewCell";
import useFileName from "../contexts/fileName/useFileName";
import useFilesContext from "../contexts/FilesContext/useFilesContext";
import useSaveFile from "../SaveFile/useSaveFile";
import Scroller from "./ScrollBar";
import { useViewportHeight } from "../Hooks/useViewportHeight";
import React, {
  useEffect,
  useRef,
  useCallback,
  CSSProperties,
  useMemo,
} from "react";

// ---------------------------
// Memoized CellWrapper
// ---------------------------
const MemoizedCellWrapper = React.memo(CellWrapper, (prevProps, nextProps) => {
  return (
    prevProps.initialContent === nextProps.initialContent &&
    prevProps.initialIsOpen === nextProps.initialIsOpen
  );
});

export default function TipTap() {
  const { cells, setCells, setIsDirty, hasLoadedOnce, setHasLoadedOnce } =
    useCellsContext();
  const createdNewCell = useCreatedNewCell();
  const { fileName } = useFileName();
  const { activeFile } = useFilesContext();
  const saveFile = useSaveFile();
  const viewportHeight = useViewportHeight();

  // ---------------------------
  // Refs برای stable closure
  // ---------------------------
  const createdNewCellRef = useRef(createdNewCell);
  const hasLoadedOnceRef = useRef(hasLoadedOnce);
  const saveShortcutRef = useRef<() => void>(() => {});

  useEffect(() => {
    createdNewCellRef.current = createdNewCell;
  }, [createdNewCell]);

  useEffect(() => {
    hasLoadedOnceRef.current = hasLoadedOnce;
  }, [hasLoadedOnce]);

  useEffect(() => {
    saveShortcutRef.current = () => {
      if (fileName) saveFile(fileName);
    };
  }, [fileName, saveFile]);

  const handleContentUpdate = useCallback(
    (cellId: string, newContent: string) => {
      setCells((prev) =>
        prev.map((c) => (c.id === cellId ? { ...c, content: newContent } : c)),
      );
      if (hasLoadedOnceRef.current) setIsDirty(true);
      else setHasLoadedOnce(true);
    },
    [setCells, setIsDirty, setHasLoadedOnce],
  );

  const handleTitleUpdate = useCallback(
    (cellId: string, newTitle: string) => {
      setCells((prev) =>
        prev.map((c) => (c.id === cellId ? { ...c, title: newTitle } : c)),
      );
      if (hasLoadedOnceRef.current) setIsDirty(true);
      else setHasLoadedOnce(true);
    },
    [setCells, setIsDirty, setHasLoadedOnce],
  );

  const renderItem = useCallback(
    (index: number) => {
      const cell = cells[index];
      if (!cell) return null;

      const initialIsOpen = (() => {
        const saved = localStorage.getItem(cell.id);
        return saved !== null ? JSON.parse(saved) : true;
      })();

      const onUpdate = (newContent: string) =>
        handleContentUpdate(cell.id, newContent);
      const onTitleUpdate = (newTitle: string) =>
        handleTitleUpdate(cell.id, newTitle);

      return (
        <div
          key={cell.id}
          className="mt-3 px-3 sm:px-4 md:px-8 animate-fade-in relative w-full max-w-3xl xl:max-w-4xl mx-auto"
        >
          <CellTitleBar
            index={index}
            cellId={cell.id}
            initialTitle={cell.title || ""}
            cellContent={cell.content}
            onTitleUpdate={onTitleUpdate}
          />
          <MemoizedCellWrapper
            initialContent={cell.content}
            cellId={cell.id}
            initialIsOpen={initialIsOpen}
            onContentUpdate={onUpdate}
          />
        </div>
      );
    },
    [cells, handleContentUpdate, handleTitleUpdate],
  );

  // Footer Styel
  const footerStyle: CSSProperties = useMemo(
    () => ({
      minHeight: Math.max(viewportHeight - 110, 0),
    }),
    [viewportHeight],
  );

  // * Footer

  const Footer = useCallback(
    () => <div style={footerStyle} className="w-full shrink-0" />,
    [footerStyle],
  );

  // ---------------------------
  // Handlers با useCallback
  // ---------------------------
  // const handleAddCell = useCallback(() => {
  //   createdNewCellRef.current();
  // }, []);

  // ---------------------------
  // Event Listeners
  // ---------------------------
  // useEffect(() => {
  //   window.ipcRenderer.on("add-cell", handleAddCell);
  //   return () => {
  //     window.ipcRenderer.removeListener("add-cell", handleAddCell);
  //   };
  // }, [handleAddCell]);

  // useEffect(() => {
  //   const listener = () => saveShortcutRef.current();
  //   window.ipcRenderer.on("shortcut:save", listener);

  //   return () => {
  //     window.ipcRenderer.removeListener("shortcut:save", listener);
  //   };
  // }, []);

  // ---------------------------
  // Render
  // ---------------------------

  if (fileName !== activeFile) {
    return null; // Prevents Virtuoso glitch during file switch
  }

  return (
    <Virtuoso
      key={fileName}
      style={{
        height: Math.max(viewportHeight - 40, 0),
        width: "100%",
      }}
      totalCount={cells.length}
      className="bg-canvas-light dark:bg-canvas-dark"
      defaultItemHeight={100}
      overscan={150}
      data-testid="cells-virtuoso"
      components={{
        Scroller,
        Footer,
      }}
      itemContent={renderItem}
    />
  );
}
