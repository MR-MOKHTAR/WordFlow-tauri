import { memo, useCallback, useState } from "react";
import { MdOutlineCheck, MdOutlineContentCopy } from "react-icons/md";
import Tooltip from "../ui/Tooltip";
import { useCellsContext } from "../contexts/cell/useCellsContext";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

type propType = {
  cellId: string;
};

function CopyButton({ cellId }: propType) {
  const { cells } = useCellsContext();
  const [isCoped, setCoped] = useState<boolean>(false);

  const copyContextHandler = useCallback(() => {
    setCoped(true);

    const result = cells.find((cell) => cell.id === cellId);

    if (result?.content) {
      const tempElement = document.createElement("div");

      tempElement.innerHTML = result.content;

      const plainText = tempElement.innerText;

      navigator.clipboard.writeText(plainText);
    }

    setTimeout(() => {
      setCoped(false);
    }, 1000);
  }, [cellId, cells]);

  return (
    <Tooltip content="Copy (Ctrl+C)" position="bottom-end" delay={700}>
      <ButtonWithIcon
        btnSize="sm"
        icon={
          !isCoped ? (
            <MdOutlineContentCopy size={18} />
          ) : (
            <MdOutlineCheck size={18} />
          )
        }
        onClick={copyContextHandler}
      />
    </Tooltip>
  );
}

export default memo(CopyButton);
