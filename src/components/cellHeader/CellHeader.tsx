import { type Editor } from "@tiptap/react";
import Redo from "./Redo";
import CopyButton from "./CopyButton";
import DeleteCell from "./DeleteCell";
import Undo from "./Undo";
import OrderedList from "./OrderedList";
import BulletList from "./BulletList";
import Bold from "./Bold";
import Italic from "./Italic";
import { memo } from "react";
import Heading from "./Heading";
import AIButton from "./AIButton";
import TextAlign from "./TextAlign";

type propType = {
  cellId: string;
  editor: Editor | null;
  isAIActive: boolean;
  onToggleAI: () => void;
};

function CellHeader({ cellId, editor, isAIActive, onToggleAI }: propType) {
  return (
    <div className="cell-header pointer-events-none">
      <div className="flex items-center gap-x-1 pointer-events-auto">
        <DeleteCell cellId={cellId} />
        <CopyButton cellId={cellId} />
        <Redo editor={editor} />
        <Undo editor={editor} />
        <OrderedList editor={editor} />
        <BulletList editor={editor} />
        <Italic editor={editor} />
        <Bold editor={editor} />
        <TextAlign editor={editor} />
        <Heading editor={editor} />
        <AIButton isActive={isAIActive} onToggle={onToggleAI} />
      </div>
    </div>
  );
}

export default memo(CellHeader);
