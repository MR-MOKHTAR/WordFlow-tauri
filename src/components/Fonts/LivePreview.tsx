import useFont from "../contexts/FontModal/useFont";

export default function LivePreview() {
  const { fontFamily, fontSize } = useFont();
  return (
      <div
        style={{ fontFamily, fontSize: `${fontSize}px` }}
        className="w-full p-4 text-justify rounded-md border border-cyan-800 h-60 overflow-hidden"
      >
        این یک نمونه‌نمایش ساده برای مشاهدهٔ تغییر فونت و اندازه است. متن شامل
        چند عبارت فارسی کوتاه است تا شکل حروف، فاصله‌ها و نحوهٔ شکستن خطوط را در
        اندازه‌ها و وزن‌های متفاوت نشان دهد.
      </div>
  );
}
