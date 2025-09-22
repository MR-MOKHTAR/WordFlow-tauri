import { Virtuoso } from "react-virtuoso";
import CellWrapper from "./CellWrapper";
import { useCellsContext } from "../contexts/cell/useCellsContext";
import useCreatedNewCell from "../Hooks/useCreatedNewCell";
import useFileName from "../contexts/fileName/useFileName";
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
        prev.map((c) => (c.id === cellId ? { ...c, content: newContent } : c))
      );
      if (hasLoadedOnceRef.current) setIsDirty(true);
      else setHasLoadedOnce(true);
    },
    [setCells, setIsDirty, setHasLoadedOnce]
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

      return (
        <div
          key={cell.id}
          className="mt-1.5 transition-all duration-300 ease-in-out transform animate-fade-in"
        >
          <MemoizedCellWrapper
            initialContent={cell.content}
            cellId={cell.id}
            initialIsOpen={initialIsOpen}
            onContentUpdate={onUpdate}
          />
        </div>
      );
    },
    [cells, handleContentUpdate]
  );

  // Footer Styel
  const footerStyle: CSSProperties = useMemo(
    () => ({
      minHeight: Math.max(viewportHeight - 110, 0),
    }),
    [viewportHeight]
  );

  // * Footer

  const Footer = useCallback(
    () => <div style={footerStyle} className="w-full shrink-0" />,
    [footerStyle]
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

  return (
    <Virtuoso
      key={fileName}
      style={{
        height: Math.max(viewportHeight - 36, 0),
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
