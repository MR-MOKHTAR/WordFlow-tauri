import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import MyModal from "./MyModal";
import useNewFile from "../contexts/newfile/useNewFile";

function NewFileModal() {
  const [fileName, setFileName] = useState("");
  const { onClose, onCreate } = useNewFile();

  const handleSubmit = useCallback(() => {
    if (!fileName.trim()) return;
    onCreate(fileName.trim());
    onClose();
  }, [fileName, onCreate, onClose]);

  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setFileName(e.target.value),
    []
  );

  const keyDownHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSubmit(),
    [handleSubmit]
  );

  useEffect(() => {
    console.log("New File Modal");
  });

  return (
    <MyModal onClose={onClose} contentSize="sm">
      <div className="flex items-center gap-x-3">
        <input
          type="text"
          autoFocus
          value={fileName}
          placeholder="اسم فایل را وارد کنید..."
          aria-label="File Name"
          onChange={changeHandler}
          onKeyDown={keyDownHandler}
          className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1E1F29] px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-stone-300"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 focus:outline-none cursor-pointer font-bold focus:ring-2 focus:ring-blue-500"
        >
          ایجاد
        </button>
      </div>
    </MyModal>
  );
}

export default NewFileModal;
