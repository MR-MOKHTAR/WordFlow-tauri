import { EditorContent, type Editor } from "@tiptap/react";
import { CSSProperties, memo, useEffect, useMemo } from "react";
import useFont from "../contexts/FontModal/useFont";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useViewportHeight } from "../Hooks/useViewportHeight";

type TiptapCellEditorProps = {
  content: string;
  editor: Editor | null;
};

function TiptapCellEditor({ content, editor }: TiptapCellEditorProps) {
  const { fontSize, fontFamily } = useFont();
  const viewportHeight = useViewportHeight();

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

  const simpleBarStyle: CSSProperties = useMemo(
    () => ({ maxHeight: viewportHeight - 90 }),
    [viewportHeight]
  );

  return (
    <div className="flex flex-col h-full">
      <SimpleBar className="flex-1 overflow-y-auto" style={simpleBarStyle}>
        <EditorContent
          editor={editor}
          className="py-4 px-5 min-h-[35px] text-justify tracking-normal whitespace-pre-wrap caret-cyan-700 text-CellHeader-light dark:text-CellHeader-dark"
          style={editorStyle}
        />
      </SimpleBar>
    </div>
  );
}

export default memo(TiptapCellEditor);
