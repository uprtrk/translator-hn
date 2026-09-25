import type { Metadata, Viewport } from "next";
import { Onest, Source_Serif_4 } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { siteUrl, contact } from "@/config";
import "../globals.css";

// Гротеск с настоящей кириллицей — вместо Inter, который стоит на каждом втором сайте.
const onest = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans",
});

// Редакционная антиква для заголовков. Кириллица + latin-ext (č, ž, š для сербского).
const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext", "cyrillic"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const OG_LOCALE: Record<string, string> = {
  ru: "ru_RU",
  en: "en_US",
  sr: "sr_ME",
};

export const viewport: Viewport = {
  themeColor: "#0d3546",
};

// Путь локали при localePrefix: "as-needed" (ru без префикса).
function localePath(locale: string) {
  return locale === routing.defaultLocale ? "/" : `/${locale}`;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const tb = await getTranslations({ locale, namespace: "brand" });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) languages[loc] = localePath(loc);
  languages["x-default"] = "/";

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    applicationName: tb("short"),
    authors: [{ name: tb("short") }],
    creator: tb("short"),
    alternates: {
      canonical: localePath(locale),
      languages,
    },
    openGraph: {
      type: "website",
      siteName: tb("name"),
      title: t("title"),
      description: t("description"),
      url: localePath(locale),
      locale: OG_LOCALE[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      // og:image берётся из src/app/opengraph-image.tsx (брендовая картинка)
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });
  const tb = await getTranslations({ locale, namespace: "brand" });
  const ts = await getTranslations({ locale, namespace: "services" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: tb("name"),
    description: t("description"),
    url: siteUrl + localePath(locale),
    image: `${siteUrl}/images/hero.jpg`,
    telephone: contact.phoneHref.replace("tel:", ""),
    email: contact.email,
    priceRange: "€€",
    knowsLanguage: ["ru", "en", "sr"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Herceg Novi",
      addressRegion: "Boka Kotorska",
      addressCountry: "ME",
    },
    areaServed: ["Herceg Novi", "Tivat", "Kotor", "Budva"],
    sameAs: [contact.telegram],
    founder: { "@type": "Person", name: tb("short") },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: ts("title"),
      itemListElement: (["interpreting", "documents", "relocation"] as const).map(
        (k) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: ts(`${k}.title`),
            description: ts(`${k}.desc`),
          },
        }),
      ),
    },
  };

  return (
    <html
      lang={locale === "sr" ? "sr-Latn" : locale}
      data-scroll-behavior="smooth"
      className={`${onest.variable} ${sourceSerif.variable}`}
    >
      <body className="bg-paper-100 text-ink-700 antialiased">
        {/* Страховка без JS: motion отдаёт анимируемые блоки с opacity:0
            прямо в HTML, и без этого правила страница была бы наполовину
            пустой у тех, у кого скрипты не отработали. */}
        <noscript>
          <style>{`.reveal-item{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <link rel="preconnect" href="https://api.web3forms.com" />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
