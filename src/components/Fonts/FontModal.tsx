import LabelWithDot from "./LabelWithDot";
import SelectField from "./SelectField";
import MyModal from "../ui/MyModal";
import useFont from "../contexts/FontModal/useFont";
import { memo, useCallback } from "react";
import FontSizeSlider from "./FontSizeSlider";
import LivePreview from "./LivePreview";

function FontModal() {
  const { setOpenFontModal } = useFont();

  const onClose = useCallback(
    () => setOpenFontModal(false),
    [setOpenFontModal]
  );

  return (
    <MyModal onClose={onClose} contentSize="3xl">
      <div className="flex items-center gap-3 mb-6">
        {/* خط سمت چپ */}
        <span className="flex-1 h-[2px] bg-gradient-to-l from-transparent to-cyan-500"></span>

        {/* دایره تزئینی سمت چپ */}
        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>

        {/* عنوان */}
        <h2 className="text-center font-bold text-2xl tracking-tight whitespace-nowrap">
          تنظیمات فونت
        </h2>

        {/* دایره تزئینی سمت راست */}
        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>

        {/* خط سمت راست */}
        <span className="flex-1 h-[2px] bg-gradient-to-r from-transparent to-cyan-500"></span>
      </div>

      <div className="space-y-8 mx-auto flex-center! flex-col">
        <div className="flex-between gap-12 *:flex-1">
          <div className="flex-between gap-x-3">
            <LabelWithDot htmlFor="fontFamily">نرم افزار</LabelWithDot>
            <SelectField />
          </div>
          <div className="flex-between gap-x-3">
            <LabelWithDot htmlFor="fontFamily">سیستم</LabelWithDot>
            <SelectField />
          </div>
        </div>
        <div className="flex-between gap-x-3">
          <LabelWithDot htmlFor="fontSize">اندازه</LabelWithDot>
          <FontSizeSlider />
        </div>
        <LivePreview />
      </div>
    </MyModal>
  );
}

export default memo(FontModal);
