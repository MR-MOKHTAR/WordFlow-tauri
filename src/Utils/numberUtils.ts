/**
 * numberUtils.ts
 * ابزارهای کمکی برای کار با اعداد (فارسی، عربی، انگلیسی)
 */

/**
 * تبدیل عدد یا رشته عددی به فرمت مشخص (fa | ar | en)
 * @param value - عدد یا رشته
 * @param locale - زبان مقصد ("fa" | "ar" | "en")، پیش‌فرض "fa"
 */

export function formatNumber(
  value: number | string,
  locale: "fa" | "ar" | "en" = "fa"
): string {
  if (typeof value === "number") {
    if (locale === "fa") return value.toLocaleString("fa-IR");
    if (locale === "ar") return value.toLocaleString("ar-SA");
    else {
      return value.toLocaleString("en-US");
    }
  }

  const maps: Record<"fa" | "ar" | "en", string[]> = {
    fa: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"],
    ar: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"],
    en: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  };

  return value.replace(/\d/g, (d) => maps[locale][Number(d)]);
}

/**
 * تبدیل رشته شامل اعداد به ارقام انگلیسی
 * (کاربردی برای پردازش محاسباتی یا ذخیره در دیتابیس)
 */

export function toEnglishDigits(value: string): string {
  const fa = "۰۱۲۳۴۵۶۷۸۹";
  const ar = "٠١٢٣٤٥٦٧٨٩";

  return value
    .replace(/[۰-۹]/g, (d) => String(fa.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ar.indexOf(d)));
}
