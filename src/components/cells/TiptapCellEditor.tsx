import { EditorContent, type Editor } from "@tiptap/react";
import { memo, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFont from "../contexts/FontModal/useFont";
import { isRTL } from "../i18next/i18n";

type TiptapCellEditorProps = {
  content: string;
  editor: Editor | null;
};

function TiptapCellEditor({ content, editor }: TiptapCellEditorProps) {
  const { fontSize, fontFamily } = useFont();
  const { i18n } = useTranslation();
  const dir = isRTL(i18n.language) ? "rtl" : "ltr";

  // فقط وقتی content واقعی تغییر کند، editor آپدیت می‌شود
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]); // editor ثابت فرض شده

  // محاسبه استایل فقط وقتی فونت تغییر کند
  const editorStyle = useMemo(
    () => ({
      fontSize: Math.max(12, +fontSize) + "px",
      fontFamily,
    }),
    [fontSize, fontFamily]
  );

  return (
    <div className="flex flex-col h-full cursor-text" onClick={() => editor?.chain().focus().run()}>
      <EditorContent
        editor={editor}
        dir={dir}
        className={`py-4 px-5 min-h-[35px] tracking-normal whitespace-pre-wrap caret-cyan-700 text-CellHeader-light dark:text-CellHeader-dark ${
          dir === "rtl" ? "text-right" : "text-left"
        }`}
        style={editorStyle}
      />
    </div>
  );
}

export default memo(TiptapCellEditor);
