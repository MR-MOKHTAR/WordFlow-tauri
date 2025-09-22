import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Extension } from "@tiptap/core";
import { CharacterCount } from "@tiptap/extensions";
import { Plugin } from "prosemirror-state";
import History from "@tiptap/extension-history";
import CellHeader from "../cellHeader/CellHeader";
import CellCollapseToggle from "./CellCollapseToggle";
import TiptapCellEditor from "./TiptapCellEditor";
import debounce from "lodash.debounce";
import WordCount from "./WordCount";
import useFilesContext from "../contexts/FilesContext/useFilesContext";

type CellWrapperProps = {
  initialContent: string;
  cellId: string;
  onContentUpdate: (content: string) => void;
  initialIsOpen: () => boolean;
};

const RemoveOutline = Extension.create({
  name: "removeOutline",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations() {
            return null;
          },
        },
      }),
    ];
  },
});

export default function CellWrapper({
  initialContent,
  cellId,
  onContentUpdate,
  initialIsOpen,
}: CellWrapperProps) {
  const [content, setContent] = useState(initialContent);
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const { updateFileMeta, activeFile, files } = useFilesContext();

  const onContentUpdateRef = useRef(onContentUpdate);

  useEffect(() => {
    onContentUpdateRef.current = onContentUpdate;
  }, [onContentUpdate]);

  const debouncedUpdate = useMemo(
    () =>
      debounce((html: string) => {
        onContentUpdateRef.current(html);
      }, 1000),
    []
  );

  const filesRef = useRef(files);

  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const updateFileMetaRef = useRef(updateFileMeta);

  useEffect(() => {
    updateFileMetaRef.current = updateFileMeta;
  }, [updateFileMeta]);

  const handleUpdate = useCallback(
    (newContent: string) => {
      setContent(newContent);
      debouncedUpdate(newContent);

      if (activeFile) {
        const file = filesRef.current[activeFile];
        if (file && !file.isDirty) {
          updateFileMetaRef.current(activeFile, { isDirty: true });
        }
      }
    },
    [activeFile, debouncedUpdate]
  );

  const editorProps = useMemo(
    () => ({
      attributes: { class: "tiptap-editor" },
      handleDOMEvents: {
        dragstart: (_view: unknown, event: Event) => {
          event.preventDefault();
          return true;
        },
        drop: (_view: unknown, event: Event) => {
          event.preventDefault();
          return true;
        },
        drag: (_view: unknown, event: Event) => {
          event.preventDefault();
          return true;
        },
      },
    }),
    []
  );

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        undoRedo: false,
        orderedList: {
          HTMLAttributes: {
            class: "order-list",
          },
          keepAttributes: true,
          keepMarks: true,
        },
        bulletList: {
          HTMLAttributes: {
            class: "bullet-list",
          },
          keepAttributes: true,
          keepMarks: true,
        },
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        code: false,
        codeBlock: false,
        link: false,
        strike: false,
        blockquote: false,
        underline: false,
        dropcursor: false,
        gapcursor: false,
      }),
      History.configure({ depth: 100, newGroupDelay: 500 }),
      RemoveOutline,
      CharacterCount.configure({
        textCounter: (text) => [...new Intl.Segmenter().segment(text)].length,
        wordCounter: (text) =>
          text.split(/\s+/).filter((word) => word !== "").length,
      }),
    ],
    []
  );

  const noScrollPlugin = new Plugin({
    props: {
      handleScrollToSelection() {
        return true;
      },
    },
  });

  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => handleUpdate(editor.getHTML()),
    editorProps: editorProps,
  });

  editor.registerPlugin(noScrollPlugin);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(cellId, JSON.stringify(isOpen));
    }, 200); // debounce کوتاه برای کاهش فشار روی دیسک

    return () => clearTimeout(timeout);
  }, [cellId, isOpen]);

  return (
    <div className="relative mx-auto max-w-210 mb-4 transition-all group shadow-primary dark:shadow-sm dark:shadow-black/10 bg-cell-light dark:bg-cell-dark rounded-lg duration-200 overflow-hidden">
      <CellCollapseToggle setIsOpen={setIsOpen} isOpen={isOpen} />
      <CellHeader editor={editor} cellId={cellId} />
      {isOpen && (
        <TiptapCellEditor key={cellId} content={content} editor={editor} />
      )}
      {isOpen && <WordCount editor={editor} />}
    </div>
  );
}
