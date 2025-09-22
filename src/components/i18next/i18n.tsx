import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n.use(HttpBackend);
i18n.use(initReactI18next);
i18n.init({
  fallbackLng: "fa",
  debug: true,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;