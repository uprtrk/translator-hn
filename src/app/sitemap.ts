import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const path = (locale: string, sub = "") =>
    (locale === routing.defaultLocale ? "" : `/${locale}`) + sub;

  const entry = (sub: string, priority: number): MetadataRoute.Sitemap => {
    const languages: Record<string, string> = {};
    for (const loc of routing.locales)
      languages[loc] = `${siteUrl}${path(loc, sub)}`;
    return routing.locales.map((locale) => ({
      url: `${siteUrl}${path(locale, sub)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: locale === routing.defaultLocale ? priority : priority - 0.2,
      alternates: { languages },
    }));
  };

  return [...entry("", 1), ...entry("/privacy", 0.5)];
}
