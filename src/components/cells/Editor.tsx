import { Virtuoso } from "react-virtuoso";
import CellWrapper from "./CellWrapper";
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
    prevProps.initialIsOpen === nextProps.initialIsOpen &&
    prevProps.initialTitle === nextProps.initialTitle
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
          className="mt-1.5 pl-4 pr-10 md:pl-8 md:pr-14 animate-fade-in relative max-w-3xl mx-auto"
        >
          {/* Cell Number Badge */}
          <div
            className="absolute right-2 md:right-4 top-2 md:top-1 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-300 text-xs md:text-sm font-bold shadow-sm border border-violet-200 dark:border-violet-700/50 z-20 select-none"
            title={`سلول ${index + 1}`}
          >
            {index + 1}
          </div>
          <MemoizedCellWrapper
            initialContent={cell.content}
            initialTitle={cell.title || ""}
            cellId={cell.id}
            initialIsOpen={initialIsOpen}
            onContentUpdate={onUpdate}
            onTitleUpdate={onTitleUpdate}
          />
        </div>
      );
    },
    [cells, handleContentUpdate],
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
