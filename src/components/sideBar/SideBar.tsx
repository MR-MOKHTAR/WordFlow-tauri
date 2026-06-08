import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useTranslation } from "react-i18next";
import AddNewFile from "./NewFile";
import ToggleSideBar from "./ToggleSideBar";
import ListFiles from "./ListFiles";
import useFetchFiles from "./useFetchFiles";
import { isRTL } from "../i18next/i18n";

const MIN_WIDTH = 200;
const MAX_WIDTH = 520;
const DEFAULT_WIDTH = 256;
const COLLAPSED_WIDTH = 48;

function SideBar() {
  const { i18n } = useTranslation();
  const rtl = isRTL(i18n.language);

  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const [width, setWidth] = useState<number>(() => {
    const saved = Number(localStorage.getItem("sidebarWidth"));
    return saved >= MIN_WIDTH && saved <= MAX_WIDTH ? saved : DEFAULT_WIDTH;
  });
  const [isResizing, setIsResizing] = useState(false);

  const fetchFiles = useFetchFiles();
  useEffect(() => {
    fetchFiles();
  }, []);

  // مقدار شروع درگ
  const startXRef = useRef(0);
  const startWRef = useRef(0);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      startXRef.current = e.clientX;
      startWRef.current = width;
      setIsResizing(true);
    },
    [width],
  );

  useEffect(() => {
    if (!isResizing) return;

    const onMove = (e: PointerEvent) => {
      const delta = e.clientX - startXRef.current;
      // در RTL سایدبار سمت راست است؛ کشیدن به چپ عرض را زیاد می‌کند
      const next = rtl ? startWRef.current - delta : startWRef.current + delta;
      setWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, next)));
    };
    const onUp = () => setIsResizing(false);

    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [isResizing, rtl]);

  useEffect(() => {
    localStorage.setItem("sidebarWidth", String(width));
  }, [width]);

  const effectiveWidth = isOpenSideBar ? width : COLLAPSED_WIDTH;

  return (
    <div
      className={`relative flex shrink-0 ${
        isResizing ? "" : "transition-[width] duration-300 ease-in-out"
      }`}
      style={{ width: effectiveWidth }}
    >
      <div
        className={`sidebar-container w-full ${
          isOpenSideBar ? "" : "items-center"
        }`}
      >
        <div className="flex-between py-1 border-b border-border-light dark:border-border-dark">
          {isOpenSideBar && <AddNewFile />}
          <ToggleSideBar setIsOpenSideBar={setIsOpenSideBar} />
        </div>
        {isOpenSideBar && <ListFiles />}
      </div>

      {/* دستگیره‌ی تغییر عرض روی لبه‌ی رو به محتوا */}
      {isOpenSideBar && (
        <div
          onPointerDown={onPointerDown}
          role="separator"
          aria-orientation="vertical"
          title=""
          className={`absolute top-0 bottom-0 end-0 w-1.5 z-20 cursor-col-resize transition-colors ${
            isResizing
              ? "bg-primary-light/60"
              : "hover:bg-primary-light/40"
          }`}
        />
      )}
    </div>
  );
}

export default memo(SideBar);
