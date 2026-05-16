import { useCallback, useState, useEffect } from "react";
import { FiPlus, FiSettings, FiSearch, FiFileText } from "react-icons/fi";
import { motion } from "framer-motion";
import useNewFile from "../contexts/newfile/useNewFile";

// یک بک‌گراند نقطه‌ای و حرفه‌ای برای داشبورد
const GridBackground = () => (
  <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
    style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      color: 'var(--color-header-light)'
    }}
  />
);

export default function WelcomeScreen() {
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
    <div className="flex-1 flex flex-col items-center justify-center w-full h-full text-header-light dark:text-header-dark bg-canvas-light dark:bg-canvas-dark overflow-hidden relative selection:bg-primary-light/30 font-Shabnam">
      
      <GridBackground />

      {/* گرادیانت ملایم در پس‌زمینه */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 via-transparent to-primary-dark/5 dark:from-primary-light/10 dark:via-transparent dark:to-primary-dark/10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-10 max-w-2xl w-full px-6"
      >
        
        {/* هدر صفحه خوش‌آمدگویی */}
        <div className="text-center space-y-3">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 h-16 mx-auto bg-primary-light/10 dark:bg-primary-light/20 text-primary-light dark:text-primary-dark rounded-2xl flex items-center justify-center mb-6 shadow-sm"
          >
            <FiFileText className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight">به WordFlow خوش آمدید</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">یادداشت‌های خود را با تمرکز و سرعت بنویسید</p>
        </div>

        {/* دکمه ایجاد نوت جدید (به شکل یک کارت) */}
        <motion.button
          whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNewNote}
          className="group relative w-full max-w-md cursor-pointer rounded-2xl bg-white dark:bg-[#1e1e2e] border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center justify-center gap-4 shadow-primary transition-all duration-300"
        >
          {/* حاشیه گرادیانت در حالت هاور */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
             <div className="absolute -inset-px bg-gradient-to-r from-primary-light to-primary-dark opacity-20 blur-sm" />
          </div>

          <div className="w-14 h-14 rounded-full bg-primary-light text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <FiPlus className="w-6 h-6" />
          </div>
          <div className="text-center">
            <span className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">ایجاد یادداشت جدید</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">یک فایل جدید برای شروع نوشتن بسازید</span>
          </div>
        </motion.button>

        {/* شورت‌کات‌ها در یک پنل شیشه‌ای */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full max-w-md bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col gap-2"
        >
          <ShortcutItem icon={<FiPlus />} label="یادداشت جدید" shortcut={`${os} + N`} />
          <ShortcutItem icon={<FiSearch />} label="جستجو در فایل‌ها" shortcut={`${os} + F`} />
          <ShortcutItem icon={<FiSettings />} label="تنظیمات برنامه" shortcut={`${os} + ,`} />
        </motion.div>
      </motion.div>
    </div>
  );
}

function ShortcutItem({ icon, label, shortcut }: { icon: React.ReactNode, label: string, shortcut: string }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors group">
      <div className="flex items-center gap-3">
        <span className="text-lg text-gray-400 dark:text-gray-500 group-hover:text-primary-light transition-colors">
          {icon}
        </span>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-1" dir="ltr">
        {shortcut.split(' ').map((part, i) => (
          part === '+' ? (
            <span key={i} className="text-[10px] mx-0.5 text-gray-400">+</span>
          ) : (
            <kbd key={i} className="px-2 py-1 text-xs font-semibold bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md font-sans shadow-sm">
              {part}
            </kbd>
          )
        ))}
      </div>
    </div>
  );
}

