import { MdOutlineSaveAlt } from "react-icons/md";
import useSaveFile from "../SaveFile/useSaveFile";
import Tooltip from "../ui/Tooltip";
import useFilesContext from "../contexts/FilesContext/useFilesContext";
import { useCallback, useEffect } from "react";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

export default function SaveButton() {
  const { activeFile } = useFilesContext();

  const saveFile = useSaveFile({ mode: "instant", throttleDelay: 500 });

  const handleClick = useCallback(
    () => activeFile && saveFile(activeFile),
    [activeFile, saveFile]
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key.toLowerCase() === "s" || event.key === "س")
      ) {
        event.preventDefault();
        handleClick();
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [handleClick]);

  return (
    <Tooltip content={`Save (Ctrl+S)`}>
      <ButtonWithIcon
        btnSize="md"
        onClick={handleClick}
        shape="md"
        icon={<MdOutlineSaveAlt size={18} />}
      />
    </Tooltip>
  );
}
