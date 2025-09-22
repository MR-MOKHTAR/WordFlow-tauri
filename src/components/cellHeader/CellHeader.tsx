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

type propType = {
  cellId: string;
  editor: Editor | null;
};

function CellHeader({ cellId, editor }: propType) {
  return (
    <div className="cell-header">
      <DeleteCell cellId={cellId} />
      <CopyButton cellId={cellId} />
      <Redo editor={editor} />
      <Undo editor={editor} />
      <OrderedList editor={editor} />
      <BulletList editor={editor} />
      <Italic editor={editor} />
      <Bold editor={editor} />
      <Heading editor={editor} />
    </div>
  );
}

export default memo(CellHeader);
