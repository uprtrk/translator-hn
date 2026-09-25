import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  const tb = await getTranslations({ locale, namespace: "brand" });
  return {
    title: `${t("title")} · ${tb("short")}`,
    alternates: { canonical: locale === routing.defaultLocale ? "/privacy" : `/${locale}/privacy` },
  };
}

type Section = { title: string; body: string };

export default function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("privacy");
  const tb = useTranslations("brand");
  const sections = t.raw("sections") as Section[];
  const updated = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
    new Date(),
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-ink-100">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-display text-lg tracking-tight text-ink-900"
          >
            {tb("short")}
          </Link>
          <LocaleSwitcher />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="link-underline mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-500"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backHome")}
        </Link>

        <h1 className="font-display text-h2 text-ink-900">
          {t("title")}
        </h1>
        <p className="mt-3 text-sm text-ink-400">
          {t("updatedLabel")}: {updated}
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-display text-h3 text-ink-900">
                {s.title}
              </h2>
              <p className="measure mt-3 leading-relaxed text-ink-500">{s.body}</p>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-ink-100">
        <div className="mx-auto max-w-3xl px-6 py-8 text-sm text-ink-400">
          © {new Date().getFullYear()} · {tb("name")}
        </div>
      </footer>
    </div>
  );
}
