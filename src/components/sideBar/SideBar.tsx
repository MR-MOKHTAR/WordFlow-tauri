import { memo, useEffect, useState } from "react";
import AddNewFile from "./NewFile";
import ToggleSideBar from "./ToggleSideBar";
import ListFiles from "./ListFiles";
import useFetchFiles from "./useFetchFiles";

function SideBar() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const fetchFiles = useFetchFiles();
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div
      className={`sidebar-container transition-all duration-300 ease-in-out ${
        isOpenSideBar ? "w-64" : "w-12 items-center"
      }`}
    >
      <div className="flex-between py-1 border-b border-gray-300 dark:border-b-gray-800">
        {isOpenSideBar && <AddNewFile />}
        <ToggleSideBar setIsOpenSideBar={setIsOpenSideBar} />
      </div>
      {isOpenSideBar && <ListFiles />}
    </div>
  );
}

export default memo(SideBar);
