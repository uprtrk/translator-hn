import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // RU — основная аудитория, EN — экспаты, SR (латиница) — местные/госорганы
  locales: ["ru", "en", "sr"],
  defaultLocale: "ru",
  // RU без префикса (/), EN → /en, SR → /sr
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
