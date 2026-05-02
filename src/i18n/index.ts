import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import es from "./locales/es.json";
import vi from "./locales/vi.json";
import zh from "./locales/zh.json";
import ar from "./locales/ar.json";
import hi from "./locales/hi.json";

export const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr", flag: "🇪🇸" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", dir: "ltr", flag: "🇻🇳" },
  { code: "zh", name: "Chinese", nativeName: "中文", dir: "ltr", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr", flag: "🇮🇳" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      vi: { translation: vi },
      zh: { translation: zh },
      ar: { translation: ar },
      hi: { translation: hi },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "es", "vi", "zh", "ar", "hi"],
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "tts_lang",
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Apply RTL direction when language changes
i18n.on("languageChanged", (lng) => {
  const lang = LANGUAGES.find((l) => l.code === lng);
  document.documentElement.dir = lang?.dir === "rtl" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
});

export default i18n;
