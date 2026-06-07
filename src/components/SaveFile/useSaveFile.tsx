import { useCallback, useRef } from "react";
import { CellType } from "../Types";
import useFilesContext from "../contexts/FilesContext/useFilesContext";
import { saveCells } from "../../services/db/notesRepo";
import { flushCells } from "../cells/editorRegistry";

type Mode = "instant" | "debounce" | "throttle";

interface SaveFileOptions {
  mode?: Mode;
  debounceDelay?: number;
  throttleDelay?: number;
}

export default function useSaveFile({
  mode = "instant",
  debounceDelay = 1000,
  throttleDelay = 5000,
}: SaveFileOptions = {}) {
  const { files, updateFileMeta, updateCells } = useFilesContext();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRunRef = useRef<number>(0);

  // همیشه آخرین نسخه‌ها را در ref نگه می‌داریم تا saveAction از stale closure رنج نبرد
  const filesRef = useRef(files);
  const updateFileMetaRef = useRef(updateFileMeta);
  const updateCellsRef = useRef(updateCells);
  filesRef.current = files;
  updateFileMetaRef.current = updateFileMeta;
  updateCellsRef.current = updateCells;

  const saveAction = useCallback(async (fileName: string) => {
    const file = filesRef.current[fileName];
    if (!file) return;

    // محتوای زنده‌ی هر سلولِ روی صفحه را قبل از ذخیره flush می‌کنیم
    // (رفع باگ «بار اول ذخیره نمی‌کند» چون state با debounce به‌روز می‌شد).
    const cells: CellType[] = flushCells(file.cells || []);

    try {
      const res = await saveCells(fileName, cells);
      if (!res?.success) throw new Error(res?.error || "ذخیره ناموفق بود");

      // state را با مقدار قطعیِ ذخیره‌شده هماهنگ و فایل را تمیز می‌کنیم
      updateCellsRef.current(fileName, cells);
      updateFileMetaRef.current(fileName, { isDirty: false });
    } catch (err) {
      console.error("خطا در ذخیره فایل:", err);
    }
  }, []);

  // تابعی برمی‌گردانیم که روی هر فایل قابل صدا زدن است و promise را برمی‌گرداند
  return useCallback(
    (fileName: string): Promise<void> => {
      const now = Date.now();

      if (mode === "instant") {
        return saveAction(fileName);
      } else if (mode === "debounce") {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          saveAction(fileName);
        }, debounceDelay);
        return Promise.resolve();
      } else {
        // throttle
        if (now - lastRunRef.current >= throttleDelay) {
          lastRunRef.current = now;
          return saveAction(fileName);
        }
        return Promise.resolve();
      }
    },
    [mode, debounceDelay, throttleDelay, saveAction],
  );
}
