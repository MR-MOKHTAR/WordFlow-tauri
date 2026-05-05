import { useState, useCallback, memo } from "react";
import { type Editor } from "@tiptap/react";
import {
  AI_ACTIONS,
  runAIAction,
  loadAISettings,
  type AIAction,
} from "../../services/ai/aiService";
import {
  MdClose,
  MdCheckCircleOutline,
  MdOutlineAutoFixHigh,
} from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";

type AIPanelProps = {
  editor: Editor | null;
  onClose: () => void;
};

function AIPanel({ editor, onClose }: AIPanelProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<AIAction | null>(null);

  const runAction = useCallback(
    async (action: AIAction) => {
      if (!editor) return;

      // Get plain text from the editor
      const text = editor.getText();
      if (!text.trim()) {
        setError("The cell is empty. Write something first.");
        return;
      }

      const settings = loadAISettings();
      setLoading(true);
      setActiveAction(action);
      setResult(null);
      setError(null);

      try {
        const output = await runAIAction(settings, action, text);
        setResult(output);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [editor],
  );

  const handleApply = useCallback(() => {
    if (!editor || !result) return;
    editor.commands.setContent(
      `<p>${result.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>")}</p>`,
    );
    onClose();
  }, [editor, result, onClose]);

  const handleAppendAfter = useCallback(() => {
    if (!editor || !result) return;
    const paragraphs = result
      .split(/\n\n+/)
      .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
      .join("");
    editor.commands.setContent(editor.getHTML() + paragraphs);
    onClose();
  }, [editor, result, onClose]);

  const handleDiscard = useCallback(() => {
    setResult(null);
    setError(null);
    setActiveAction(null);
  }, []);

  return (
    <div className="relative border-t border-gray-200 dark:border-gray-700 bg-cell-light dark:bg-cell-dark rounded-b-lg">
      {/* Universal Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2.5 left-2.5 p-1.5 rounded-lg text-gray-400 hover:text-red-500 dark:hover:text-red-400
          hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 cursor-pointer z-20 group"
        title="بستن پنل هوش مصنوعی"
      >
        <MdClose size={18} className="group-active:scale-90 transition-transform" />
      </button>

      {/* Actions row */}
      {!result && !loading && (
        <div className="flex items-center gap-1.5 pl-12 pr-3 py-2.5 flex-wrap">
          <MdOutlineAutoFixHigh
            size={16}
            className="text-violet-500 dark:text-violet-400 shrink-0"
          />
          {AI_ACTIONS.map((a) => (
            <button
              key={a.id}
              onClick={() => runAction(a.id)}
              className="px-2.5 py-1 text-xs rounded-md border border-gray-200 dark:border-gray-600
                text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/20
                hover:border-violet-300 dark:hover:border-violet-600 hover:text-violet-700 dark:hover:text-violet-300
                transition-all duration-150 active:scale-95 cursor-pointer"
            >
              {a.labelFa}
            </button>
          ))}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center gap-2.5 pl-12 pr-4 py-3">
          <ImSpinner8 size={14} className="animate-spin text-violet-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            در حال پردازش...
          </span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="pl-12 pr-3 py-2.5 space-y-2">
          <p className="text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md px-3 py-2">
            ⚠️ {error}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleDiscard}
              className="px-3 py-1.5 text-xs rounded-md bg-gray-100 dark:bg-gray-700
                text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all cursor-pointer"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      )}

      {/* Result state */}
      {result && !loading && (
        <div className="pl-12 pr-3 py-2.5 space-y-2.5">
          <div className="flex items-center gap-1.5 mb-1">
            <MdCheckCircleOutline size={14} className="text-green-500" />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {AI_ACTIONS.find((a) => a.id === activeAction)?.labelFa} — نتیجه
            </span>
          </div>

          {/* Result preview */}
          <div
            className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50
              rounded-lg px-3 py-2.5 max-h-40 overflow-y-auto leading-relaxed
              border border-gray-100 dark:border-gray-700"
            dir="auto"
          >
            {result}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleApply}
              className="px-3 py-1.5 text-xs rounded-md bg-violet-600 hover:bg-violet-700
                text-white font-medium transition-all active:scale-95 cursor-pointer"
            >
              جایگزین کن
            </button>
            {activeAction === "continue" && (
              <button
                onClick={handleAppendAfter}
                className="px-3 py-1.5 text-xs rounded-md bg-green-600 hover:bg-green-700
                  text-white font-medium transition-all active:scale-95 cursor-pointer"
              >
                اضافه کن
              </button>
            )}
            <button
              onClick={handleDiscard}
              className="px-3 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-600
                text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer"
            >
              دوباره امتحان
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(AIPanel);
