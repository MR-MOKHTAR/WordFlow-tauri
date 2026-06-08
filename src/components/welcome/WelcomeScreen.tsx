import { useCallback, useState, useEffect } from "react";
import { FiPlus, FiSettings, FiSearch, FiFileText } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useNewFile from "../contexts/newfile/useNewFile";

// بک‌گراند نقطه‌ای ملایم
const GridBackground = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
    style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
      backgroundSize: "24px 24px",
      color: "var(--color-header-light)",
    }}
  />
);

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const { setOpenNewFileModal } = useNewFile();

  const handleNewNote = useCallback(() => {
    setOpenNewFileModal(true);
  }, [setOpenNewFileModal]);

  const [os, setOs] = useState("Ctrl");

  useEffect(() => {
    if (navigator.userAgent.indexOf("Mac") !== -1) {
      setOs("⌘");
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full h-full text-header-light dark:text-header-dark bg-canvas-light dark:bg-canvas-dark overflow-hidden relative selection:bg-primary-light/30">
      <GridBackground />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-10"
      >
        {/* واترمارک محو (بدون متن) */}
        <FiFileText className="w-20 h-20 text-gray-300 dark:text-gray-700/70" />

        {/* فقط آیکون‌ها و شورت‌کات‌ها */}
        <div className="flex flex-col gap-1 min-w-[220px]">
          <ShortcutItem
            icon={<FiPlus />}
            shortcut={`${os} + N`}
            title={t("welcome.shortcutNewNote")}
            onClick={handleNewNote}
          />
          <ShortcutItem
            icon={<FiSearch />}
            shortcut={`${os} + F`}
            title={t("welcome.shortcutSearch")}
          />
          <ShortcutItem
            icon={<FiSettings />}
            shortcut={`${os} + ,`}
            title={t("welcome.shortcutSettings")}
          />
        </div>
      </motion.div>
    </div>
  );
}

function ShortcutItem({
  icon,
  shortcut,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  shortcut: string;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`flex items-center justify-between gap-8 py-2 px-3 rounded-lg text-gray-400 dark:text-gray-500 transition-colors group ${
        onClick
          ? "cursor-pointer hover:text-primary-light hover:bg-gray-100/70 dark:hover:bg-gray-800/40"
          : "cursor-default hover:text-gray-500 dark:hover:text-gray-400"
      }`}
    >
      <span className="text-xl shrink-0">{icon}</span>
      <div className="flex items-center gap-1" dir="ltr">
        {shortcut.split(" ").map((part, i) =>
          part === "+" ? (
            <span key={i} className="text-[10px] mx-0.5 text-gray-400">
              +
            </span>
          ) : (
            <kbd
              key={i}
              className="px-2 py-1 text-xs font-semibold bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md font-sans shadow-sm"
            >
              {part}
            </kbd>
          ),
        )}
      </div>
    </button>
  );
}
