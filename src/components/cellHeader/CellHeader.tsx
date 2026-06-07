import { type Editor } from "@tiptap/react";
import Redo from "./Redo";
import CopyButton from "./CopyButton";
import DeleteCell from "./DeleteCell";
import Undo from "./Undo";
import OrderedList from "./OrderedList";
import BulletList from "./BulletList";
import Bold from "./Bold";
import Italic from "./Italic";
import { Dispatch, memo, SetStateAction } from "react";
import Heading from "./Heading";
import AIButton from "./AIButton";
import TextAlign from "./TextAlign";
import CellCollapseToggle from "../cells/CellCollapseToggle";

type propType = {
  cellId: string;
  editor: Editor | null;
  isAIActive: boolean;
  onToggleAI: () => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const Divider = () => (
  <span className="mx-0.5 h-4 w-px bg-border-light dark:bg-white/10 self-center" />
);

function CellHeader({
  cellId,
  editor,
  isAIActive,
  onToggleAI,
  isOpen,
  setIsOpen,
}: propType) {
  return (
    <div className="cell-header pointer-events-none">
      {/* AI assistant — kept on its own, away from the formatting tools */}
      <div className="pointer-events-auto">
        <AIButton isActive={isAIActive} onToggle={onToggleAI} />
      </div>

      {/* Formatting & cell actions */}
      <div className="flex items-center gap-x-1 pointer-events-auto">
        {/* History */}
        <Undo editor={editor} />
        <Redo editor={editor} />
        <Divider />
        {/* Inline formatting */}
        <Bold editor={editor} />
        <Italic editor={editor} />
        <Divider />
        {/* Lists */}
        <OrderedList editor={editor} />
        <BulletList editor={editor} />
        <Divider />
        {/* Block: alignment & heading */}
        <TextAlign editor={editor} />
        <Heading editor={editor} />
        <Divider />
        {/* Cell actions */}
        <CopyButton cellId={cellId} />
        <DeleteCell cellId={cellId} />
        <Divider />
        {/* Collapse / expand */}
        <CellCollapseToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}

export default memo(CellHeader);
