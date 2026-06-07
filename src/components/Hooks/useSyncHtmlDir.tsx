import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isRTL } from "../i18next/i18n";

/**
 * Keeps <html dir/lang> in sync with the active i18n language and toggles a
 * `latin` class on the root so Latin (English) content can use a Latin font
 * stack while Persian/Arabic keep their dedicated fonts.
 */
export default function useSyncHtmlDir() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const apply = (lng: string) => {
      const lang = lng.split("-")[0];
      const root = document.documentElement;
      root.lang = lang;
      root.dir = isRTL(lang) ? "rtl" : "ltr";
      root.classList.toggle("latin", lang === "en");
    };

    apply(i18n.language || "fa");
    i18n.on("languageChanged", apply);
    return () => {
      i18n.off("languageChanged", apply);
    };
  }, [i18n]);
}
