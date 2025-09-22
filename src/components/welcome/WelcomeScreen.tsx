import { useCallback } from "react";
import { FiPlusCircle } from "react-icons/fi";
import useNewFile from "../contexts/newfile/useNewFile";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

export default function WelcomeScreen() {
  const { setOpenNewFileModal } = useNewFile();

  const handleNewNote = useCallback(() => {
    setOpenNewFileModal(true);
  }, [setOpenNewFileModal]);

  return (
    <div className="editor-scrollbar flex flex-col items-center justify-start w-full gap-10 py-7 px-12 bg-canvas-light dark:bg-context-dark text-gray-900 dark:text-gray-100 overflow-auto">
      {/* عنوان */}
      <div className="text-center max-w-3xl animate-fade-in">
        <h1 className="text-5xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent select-none">
            WordFlow
          </span>{" "}
        </h1>
      </div>

      {/* توضیحات اهداف */}
      <div className="w-full max-w-3xl flex flex-col gap-6 animate-fade-in delay-100">
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-sidebar-light dark:bg-sidebar-dark/50 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">
            ✍️ ویرایشگر ساده و کاربردی
          </h2>
          <p className="opacity-90">
            محیطی روان و زیبا برای نوشتن متن‌ها و یادداشت‌های شما، بدون پیچیدگی
            اضافی.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-sidebar-light dark:bg-sidebar-dark/50 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">📑 مدیریت سلول‌ها</h2>
          <p className="opacity-90">
            هر یادداشت از چندین «سلول» تشکیل شده است. در هر سلول می‌توانید
            محتوای مستقل (متن، ایده یا یادداشت جداگانه) اضافه کنید.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-sidebar-light dark:bg-sidebar-dark/50 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">📄 خروجی PDF</h2>
          <p className="opacity-90">
            در پایان کار می‌توانید یادداشت‌های خود را به‌صورت PDF ذخیره کرده و
            داخل نرم‌افزار مشاهده کنید.
          </p>
        </div>
      </div>

      {/* دکمه ایجاد یادداشت */}
      <div className="mt-8 animate-fade-in delay-200">
        <UnifiedButton
          onClick={handleNewNote}
          color="info"
          startIcon={<FiPlusCircle size={20} />}
          variant="outlined"
          size="large"
          sx={{
            gap: 2,
            pr: 2,
            pl: 3,
            paddingBlock: 1.5,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
          }}
        >
          ایجاد یادداشت جدید
        </UnifiedButton>
      </div>
    </div>
  );
}
