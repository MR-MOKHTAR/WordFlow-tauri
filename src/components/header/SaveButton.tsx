import { MdOutlineSaveAlt } from "react-icons/md";
import useSaveFile from "../SaveFile/useSaveFile";
import Tooltip from "../ui/Tooltip";
import useFilesContext from "../contexts/FilesContext/useFilesContext";
import { useCallback, useEffect, useRef } from "react";
import ButtonWithIcon from "../ui/Buttons/ButtonWithIcon";

export default function SaveButton() {
  const { activeFile } = useFilesContext();

  const saveFile = useSaveFile({ mode: "instant", throttleDelay: 500 });

  const handleClick = useCallback(
    () => activeFile && saveFile(activeFile),
    [activeFile, saveFile]
  );

  // همیشه آخرین نسخه handleClick را در ref نگه می‌داریم
  // تا event listener روی Ctrl+S از stale closure رنج نبرد
  const handleClickRef = useRef(handleClick);
  handleClickRef.current = handleClick;

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key.toLowerCase() === "s" || event.key === "س")
      ) {
        event.preventDefault();
        // از ref می‌خوانیم تا همیشه آخرین handleClick صدا زده شود
        handleClickRef.current();
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []); // ✅ فقط یکبار listener ثبت می‌شود و دیگر re-register نمی‌کند

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
