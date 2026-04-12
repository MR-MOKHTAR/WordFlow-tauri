import { EditorContent, type Editor } from "@tiptap/react";
import { memo, useEffect, useMemo } from "react";
import useFont from "../contexts/FontModal/useFont";

type TiptapCellEditorProps = {
  content: string;
  editor: Editor | null;
};

function TiptapCellEditor({ content, editor }: TiptapCellEditorProps) {
  const { fontSize, fontFamily } = useFont();

  // فقط وقتی content واقعی تغییر کند، editor آپدیت می‌شود
  useEffect(() => {
    if (!editor) return;
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
    <div className="flex flex-col h-full">
      <EditorContent
        editor={editor}
        className="py-4 px-5 min-h-[35px] text-justify tracking-normal whitespace-pre-wrap caret-cyan-700 text-CellHeader-light dark:text-CellHeader-dark"
        style={editorStyle}
      />
    </div>
  );
}

export default memo(TiptapCellEditor);
