// hooks/useCreatedNewCell.ts
import { useCallback } from "react";
import { useCellsContext } from "../contexts/cell/useCellsContext";
import { CellType } from "../Types";

export default function useCreatedNewCell() {
  const { setCells, setHasLoadedOnce, setIsDirty } = useCellsContext();

  const createdNewCell = useCallback(
    (newCells?: CellType[] | CellType) => {
      if (newCells) {
        // حالت: فایل باز شده → جایگزینی کامل
        const incoming = Array.isArray(newCells) ? newCells : [newCells];
        setCells(incoming);
        setHasLoadedOnce(false);
        setIsDirty(false);
      } else {
        // حالت: افزودن یک سلول جدید
        const emptyCell: CellType = {
          id: crypto.randomUUID(),
          content: "",
          isOpen: true,
        };

        setCells((prev: CellType[]) => {
          const updated = [...prev, emptyCell];
          return updated;
        });
      }
    },
    [setCells, setHasLoadedOnce, setIsDirty]
  );

  return createdNewCell;
}
