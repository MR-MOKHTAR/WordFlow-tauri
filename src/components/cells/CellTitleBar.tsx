import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";
import { MdAutoAwesome } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import { formatNumber } from "../../Utils/numberUtils";
import { generateTitle, loadAISettings } from "../../services/ai/aiService";
import useToast from "../contexts/toast/useToast";
import { setCellFlush, clearCellFlush } from "./editorRegistry";

type CellTitleBarProps = {
  index: number;
  cellId: string;
  initialTitle: string;
  cellContent: string;
  onTitleUpdate: (title: string) => void;
};

const htmlToText = (html: string) => {
  const doc = new DOMParser().parseFromString(html || "", "text/html");
  return doc.body.textContent || "";
};

/**
 * Editable title shown ABOVE the cell card (not on top of the toolbar).
 * Carries the cell number badge and a small AI button that drafts a title from
 * the cell's text content.
 */
function CellTitleBar({
  index,
  cellId,
  initialTitle,
  cellContent,
  onTitleUpdate,
}: CellTitleBarProps) {
  const { t } = useTranslation();
  const { setToast, setIsShowToast } = useToast();
  const [title, setTitle] = useState(initialTitle);
  const [loading, setLoading] = useState(false);

  // Keep local state in sync when the underlying cell changes (e.g. file switch).
  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  // آخرین مقدار title را در ref نگه می‌داریم تا flush هنگام ذخیره بخواندش.
  const titleRef = useRef(title);
  titleRef.current = title;

  const onTitleUpdateRef = useRef(onTitleUpdate);
  useEffect(() => {
    onTitleUpdateRef.current = onTitleUpdate;
  }, [onTitleUpdate]);

  const debouncedUpdate = useMemo(
    () =>
      debounce((newTitle: string) => {
        onTitleUpdateRef.current(newTitle);
      }, 1000),
    [],
  );

  // ثبت عنوانِ زنده در رجیستری تا ذخیره همیشه آخرین عنوان را بگیرد.
  useEffect(() => {
    setCellFlush(cellId, {
      getTitle: () => titleRef.current,
      cancelTitle: () => debouncedUpdate.cancel(),
    });
    return () => clearCellFlush(cellId, ["getTitle", "cancelTitle"]);
  }, [cellId, debouncedUpdate]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      setTitle(newTitle);
      debouncedUpdate(newTitle);
    },
    [debouncedUpdate],
  );

  const showError = useCallback(
    (message: string, duration = 3500) => {
      setToast({ type: "error", message });
      setIsShowToast(true);
      setTimeout(() => setIsShowToast(false), duration);
    },
    [setToast, setIsShowToast],
  );

  const handleGenerate = useCallback(async () => {
    if (loading) return;
    const text = htmlToText(cellContent).trim();
    if (!text) {
      showError(t("cell.emptyForTitle"));
      return;
    }

    setLoading(true);
    try {
      const newTitle = await generateTitle(loadAISettings(), text.slice(0, 4000));
      if (newTitle) {
        setTitle(newTitle);
        debouncedUpdate.cancel();
        onTitleUpdateRef.current(newTitle);
      }
    } catch (err) {
      showError(err instanceof Error ? err.message : String(err), 4500);
    } finally {
      setLoading(false);
    }
  }, [loading, cellContent, t, showError, debouncedUpdate]);

  return (
    <div className="flex items-center gap-2 mb-1.5 ps-0.5">
      <span
        className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full
          bg-primary-light/10 dark:bg-primary-dark/15 text-primary-light dark:text-primary-dark
          text-xs font-bold select-none"
        title={t("cell.number", { index: index + 1 })}
      >
        {formatNumber(index + 1)}
      </span>
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder={t("cell.titlePlaceholder")}
        dir="auto"
        className="flex-1 min-w-0 bg-transparent text-sm font-medium outline-none border-none
          text-gray-600 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500
          focus:text-primary-light dark:focus:text-primary-dark transition-colors"
      />
      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        title={t("cell.generateTitle")}
        aria-label={t("cell.generateTitle")}
        className="shrink-0 flex items-center justify-center w-6 h-6 rounded-md text-gray-400
          hover:text-primary-light dark:hover:text-primary-dark hover:bg-primary-light/10
          dark:hover:bg-primary-dark/15 transition-colors cursor-pointer
          disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <ImSpinner8 size={13} className="animate-spin" />
        ) : (
          <MdAutoAwesome size={14} />
        )}
      </button>
    </div>
  );
}

export default memo(CellTitleBar);
