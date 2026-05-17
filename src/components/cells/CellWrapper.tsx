import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Extension } from "@tiptap/core";
import { CharacterCount } from "@tiptap/extensions";
import { Plugin } from "prosemirror-state";
import History from "@tiptap/extension-history";
import TextAlignExtension from "@tiptap/extension-text-align";
import CellHeader from "../cellHeader/CellHeader";
import CellCollapseToggle from "./CellCollapseToggle";
import TiptapCellEditor from "./TiptapCellEditor";
import AIPanel from "../AI/AIPanel";
import debounce from "lodash.debounce";
import WordCount from "./WordCount";
import useFilesContext from "../contexts/FilesContext/useFilesContext";
import useSaveFile from "../SaveFile/useSaveFile";

type CellWrapperProps = {
  initialContent: string;
  initialTitle: string;
  cellId: string;
  onContentUpdate: (content: string) => void;
  onTitleUpdate: (title: string) => void;
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
  initialTitle,
  cellId,
  onContentUpdate,
  onTitleUpdate,
  initialIsOpen,
}: CellWrapperProps) {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const handleToggleAI = useCallback(() => setIsAIOpen((v) => !v), []);
  const handleCloseAI = useCallback(() => setIsAIOpen(false), []);
  const { updateFileMeta, activeFile, files } = useFilesContext();
  const saveFile = useSaveFile({ mode: "instant" });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAIOpen && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [isAIOpen]);

  const onContentUpdateRef = useRef(onContentUpdate);
  const onTitleUpdateRef = useRef(onTitleUpdate);

  useEffect(() => {
    onContentUpdateRef.current = onContentUpdate;
  }, [onContentUpdate]);

  useEffect(() => {
    onTitleUpdateRef.current = onTitleUpdate;
  }, [onTitleUpdate]);

  const debouncedUpdate = useMemo(
    () =>
      debounce((html: string) => {
        onContentUpdateRef.current(html);
      }, 1000),
    [],
  );

  const debouncedTitleUpdate = useMemo(
    () =>
      debounce((newTitle: string) => {
        onTitleUpdateRef.current(newTitle);
      }, 1000),
    [],
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
    [activeFile, debouncedUpdate],
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      setTitle(newTitle);
      debouncedTitleUpdate(newTitle);

      if (activeFile) {
        const file = filesRef.current[activeFile];
        if (file && !file.isDirty) {
          updateFileMetaRef.current(activeFile, { isDirty: true });
        }
      }
    },
    [activeFile, debouncedTitleUpdate],
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
    [],
  );

  const extensions = useMemo(() => {
    const AIHotkey = Extension.create({
      name: "aiHotkey",
      addKeyboardShortcuts() {
        return {
          "Mod-j": () => {
            handleToggleAI();
            return true;
          },
          "Mod-ت": () => {
            handleToggleAI();
            return true;
          },
        };
      },
    });

    return [
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
      TextAlignExtension.configure({
        types: ["heading", "paragraph", "listItem"],
        defaultAlignment: "right",
      }),
      AIHotkey,
    ];
  }, [handleToggleAI]);

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
    onBlur: () => {
      if (activeFile) {
        saveFile(activeFile);
      }
    },
    editorProps: editorProps,
  });

  if (editor && !editor.isDestroyed) {
    editor.registerPlugin(noScrollPlugin);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(cellId, JSON.stringify(isOpen));
    }, 200); // debounce کوتاه برای کاهش فشار روی دیسک

    return () => clearTimeout(timeout);
  }, [cellId, isOpen]);

  return (
    <div
      ref={containerRef}
      onClick={() => {
        if (!isOpen) setIsOpen(true);
      }}
      className={`relative w-full mx-auto max-w-3xl mb-6 transition group shadow-sm hover:shadow-primary dark:shadow-none dark:border dark:border-white/5 bg-cell-light dark:bg-cell-dark rounded-xl duration-300 ease-in-out overflow-hidden ${
        !isOpen ? "cursor-pointer" : ""
      }`}
    >
      <CellHeader
        editor={editor}
        cellId={cellId}
        isAIActive={isAIOpen}
        onToggleAI={handleToggleAI}
      />
      {/* Title Input */}
      <div
        className={`absolute top-0 left-0 w-full h-10 flex items-center justify-center pointer-events-none transition-opacity duration-300 z-10 ${
          !isOpen
            ? "opacity-100 group-hover:opacity-0"
            : "opacity-30 hover:opacity-100 focus-within:opacity-100"
        }`}
      >
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="عنوان سلول..."
          className="pointer-events-auto bg-transparent text-center outline-none border-none text-sm font-medium text-gray-700 dark:text-gray-300 focus:text-primary-light dark:focus:text-primary-dark w-1/2"
          onClick={(e) => {
            if (!isOpen) e.stopPropagation();
          }}
        />
      </div>
      <CellCollapseToggle setIsOpen={setIsOpen} isOpen={isOpen} />
      {isOpen && (
        <TiptapCellEditor key={cellId} content={content} editor={editor} />
      )}
      {isOpen && <WordCount editor={editor} />}
      {isAIOpen && <AIPanel editor={editor} onClose={handleCloseAI} />}
    </div>
  );
}
