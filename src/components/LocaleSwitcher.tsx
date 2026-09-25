"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  ru: "RU",
  en: "EN",
  sr: "SR",
};

const FULL: Record<string, string> = {
  ru: "Русский",
  en: "English",
  sr: "Srpski",
};

export default function LocaleSwitcher({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Language">
      {routing.locales.map((loc) => {
        const active = loc === locale;
        const base = "px-2.5 py-1 text-xs font-medium tracking-wide transition-colors";
        const styles = active
          ? variant === "dark"
            ? "bg-paper-50 text-ink-900"
            : "bg-ink-900 text-paper-50"
          : variant === "dark"
            ? "text-paper-200/80 hover:bg-white/15"
            : "text-ink-400 hover:text-ink-900";
        return (
          <button
            key={loc}
            type="button"
            lang={loc}
            aria-label={FULL[loc]}
            title={FULL[loc]}
            aria-current={active ? "true" : undefined}
            onClick={() => router.replace(pathname, { locale: loc })}
            className={`${base} ${styles}`}
          >
            {LABELS[loc]}
          </button>
        );
      })}
    </div>
  );
}
