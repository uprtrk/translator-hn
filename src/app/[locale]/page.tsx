import { use } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Phone, Mail, Send } from "lucide-react";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Reveal, { RevealItem } from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingContact from "@/components/FloatingContact";
import ScrollProgress from "@/components/ScrollProgress";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import { contact } from "@/config";
import heroImg from "../../../public/images/hero.jpg";
import coastImg from "../../../public/images/coast.jpg";
// Портрет Николая для секции «обо мне».
// Пока стоит фото города: чтобы поставить настоящий портрет — положи файл
// в public/images/nikolai.jpg и поменяй путь только в этой строке.
import portraitImg from "../../../public/images/town.jpg";
import svcInterpret from "../../../public/images/svc-interpret.jpg";
import svcDocs from "../../../public/images/svc-docs.jpg";
import svcRelocation from "../../../public/images/svc-relocation.jpg";
import reviewsBg from "../../../public/images/reviews-bg.jpg";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("nav");

  return (
    <div id="top" className="grain min-h-screen bg-paper-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper-50 focus:px-4 focus:py-2 focus:font-medium focus:text-ink-900 focus:shadow-paper"
      >
        {t("skip")}
      </a>
      <SmoothScroll />
      <AnalyticsEvents />
      <ScrollProgress />
      <FloatingContact />
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <Services />
        <Requests />
        <HowItWorks />
        <About />
        {/* Единственная тёмная глава страницы: отзывы + призыв. */}
        <Reviews />
        <MidCta />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ─────────────── Hero ───────────────
   Обложка журнала: фотография, одна крупная антиква и тонкая
   выходная строка внизу. Ни одной карточки. */
function Hero() {
  const t = useTranslations("hero");
  const meta = ["languages", "local", "response"] as const;

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      <Image
        src={heroImg}
        alt={t("imageAlt")}
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="hero-zoom object-cover"
      />
      {/* Затемнение снизу вверх: текст читается, небо остаётся небом. */}
      {/* Верхняя точка поднята с 0.30 до 0.52: на светлом небе рубрика
          и первые строки заголовка не читались. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,26,33,0.92)_0%,rgba(12,26,33,0.72)_38%,rgba(12,26,33,0.42)_72%,rgba(12,26,33,0.52)_100%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-28 sm:pb-16">
        <p className="eyebrow text-paper-200">{t("eyebrow")}</p>

        <h1 className="display-xl mt-5 max-w-[22ch] text-display text-paper-50">
          {t.rich("title", {
            hl: (chunks) => (
              <em className="display-italic not-italic italic text-accent-400">
                {chunks}
              </em>
            ),
          })}
        </h1>

        <p className="measure mt-6 text-lede text-paper-200/85">
          {t("subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            data-track="telegram"
            className="group inline-flex items-center gap-3 bg-paper-50 px-8 py-4 text-base font-medium text-ink-950 transition-colors hover:bg-accent-500 hover:text-paper-50"
          >
            {t("ctaPrimary")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="link-underline text-base font-medium text-paper-100"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        {/* Выходная строка: три факта в разрядку, разделённые линейками. */}
        <ul className="rule-ink mt-10 grid gap-px overflow-hidden pt-6 sm:grid-cols-3">
          {meta.map((k) => (
            <li
              key={k}
              className="text-sm leading-relaxed text-paper-200/75 sm:border-l sm:border-white/12 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
            >
              {t(`badges.${k}`)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────── Статистика ───────────────
   Не парящая карточка с тремя колонками, а наборная полоса:
   крупные цифры антиквой, подписи в разрядку, волосяные линейки. */
function Stats() {
  const t = useTranslations("stats");
  const items = ["years", "clients", "languages"] as const;

  return (
    <section className="bg-paper-100">
      <Reveal
        className="mx-auto grid max-w-6xl gap-y-10 px-6 py-16 sm:grid-cols-3 sm:py-20"
        stagger={0.12}
      >
        {items.map((key) => (
          <RevealItem
            key={key}
            className="sm:border-l sm:border-ink-100 sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
          >
            <div className="font-display tnum text-6xl leading-none text-ink-900 sm:text-7xl">
              {t(`${key}.value`)}
            </div>
            <div className="eyebrow mt-4">{t(`${key}.label`)}</div>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

/* ─────────────── Услуги ───────────────
   Зигзаг вместо трёх одинаковых карточек: фото меняет сторону,
   номер набран крупной антиквой, цена прижата к линейке. */
function Services() {
  const t = useTranslations("services");
  const items = [
    { key: "interpreting", img: svcInterpret },
    { key: "documents", img: svcDocs },
    { key: "relocation", img: svcRelocation },
  ] as const;

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="mx-auto max-w-6xl px-6 py-20 sm:py-28"
    >
      <SectionHead title={t("title")} subtitle={t("subtitle")} titleId="services-title" />

      <div className="mt-14 space-y-14 sm:space-y-20">
        {items.map(({ key, img }, i) => {
          const flipped = i % 2 === 1;
          return (
            <Reveal key={key} as="div" stagger={0.14}>
              <article className="group grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <RevealItem
                  as="figure"
                  className={`relative aspect-[4/3] overflow-hidden lg:col-span-5 ${
                    flipped ? "lg:order-2 lg:col-start-8" : ""
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                </RevealItem>

                <RevealItem
                  className={`lg:col-span-6 ${flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-display tnum text-5xl leading-none text-ink-200">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-h2 text-ink-900">
                      {t(`${key}.title`)}
                    </h3>
                  </div>

                  <p className="measure mt-6 text-lede text-ink-500">
                    {t(`${key}.desc`)}
                  </p>

                  <div className="rule mt-8 flex flex-wrap items-baseline justify-between gap-4 pt-5">
                    <span className="eyebrow">{t("priceLabel")}</span>
                    <span className="font-display tnum text-h3 text-accent-600">
                      {t(`${key}.price`)}
                    </span>
                  </div>

                  <a
                    href="#contact"
                    data-service={key}
                    className="link-underline mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink-900"
                  >
                    {t("cardCta")}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </RevealItem>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────── Частые запросы ───────────────
   Два наборных столбца-перечня. Никаких коробок — только линейки. */
function Requests() {
  const t = useTranslations("requests");
  const cases = t.raw("cases") as string[];

  return (
    <section
      aria-labelledby="requests-title"
      className="bg-paper-200 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          titleId="requests-title"
        />

        {/* Колонка «Документы» убрана по просьбе заказчика 20.08.2026.
            Ключи requests.docs / requests.docsTitle остались в messages/*.json
            неиспользованными — если решишь не возвращать, можно вычистить. */}
        <Reveal className="mt-12 max-w-5xl" stagger={0.15}>
          <RequestList title={t("casesTitle")} items={cases} />
        </Reveal>
      </div>
    </section>
  );
}

function RequestList({ title, items }: { title: string; items: string[] }) {
  return (
    <RevealItem>
      <h3 className="display-italic text-h3 text-ink-900">{title}</h3>
      <ul className="mt-6 sm:columns-2 sm:gap-x-16">
        {items.map((item) => (
          <li
            key={item}
            className="rule flex gap-5 break-inside-avoid py-3.5 text-[15px] leading-relaxed text-ink-700"
          >
            {/* Маркер набором, а не иконкой-галочкой: спокойнее и чище. */}
            <span aria-hidden className="tnum select-none text-ink-300">
              —
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </RevealItem>
  );
}

/* ─────────────── Как это работает ───────────────
   Процесс лесенкой: каждый следующий шаг чуть ниже предыдущего,
   поэтому четыре колонки не читаются как четыре одинаковые плитки. */
function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = ["s1", "s2", "s3", "s4"] as const;

  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="mx-auto max-w-6xl px-6 py-20 sm:py-24"
    >
      <SectionHead
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        titleId="how-title"
      />

      <Reveal as="ol" className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
        {steps.map((s, i) => (
          <RevealItem
            key={s}
            as="li"
            className="rule pt-6"
            // Оптическая лесенка: ломает ровный ряд, но не мешает мобильной вёрстке.
            style={{ marginTop: `calc(${i} * 1.25rem)` }}
          >
            {/* Мелкая наборная нумерация вместо крупной антиквы: крупные
                цифры уже несут «услуги» и «ситуации», третья секция подряд
                с тем же приёмом делала страницу однообразной. */}
            <span className="eyebrow tnum block text-accent-500">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-h3 text-ink-900">
              {t(`steps.${s}.title`)}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
              {t(`steps.${s}.desc`)}
            </p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

/* ─────────────── Обо мне ───────────────
   Асимметрия: портрет уходит в край полосы, текст смещён и заходит
   на фотографию — так разворот перестаёт быть двумя ровными половинами. */
function About() {
  const t = useTranslations("about");
  const points = ["p1", "p2", "p3"] as const;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="overflow-hidden bg-paper-100 py-20 sm:py-28"
    >
      <Reveal
        className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-0"
        stagger={0.16}
      >
        {/* Фото занимает 7 колонок, текст начинается с 7-й — наезд ровно
            в одну колонку. Раньше перекрытие было ~36px и читалось не как
            приём, а как случайно обрезанное справа фото. Квадрат вместо
            4/5: колонка текста короче, и под фото не оставалось пустоты. */}
        {/* col-start обязателен обоим: без него grid не даёт колонкам
            пересечься и выталкивает фото в неявные колонки нулевой ширины. */}
        <RevealItem as="figure" className="relative lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={portraitImg}
              alt=""
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            {/* Языки набором прямо в кадре — вместо плашки с тенью.
                Под текстом градиентная подложка, иначе на светлом
                участке фотографии он теряется. */}
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(12,26,33,0.85),transparent)] px-6 pb-6 pt-16">
              <p className="font-display text-4xl leading-none text-paper-50">
                RU · EN · SR
              </p>
              <p className="mt-2 text-sm text-paper-200/80">{t("langsLabel")}</p>
            </figcaption>
          </div>
        </RevealItem>

        {/* Текст лежит на фото как отдельный лист: тон светлее фона секции,
            блок прижат к низу и ниже фото не доходит — поэтому над ним
            видна фотография, и перекрытие читается как приём. */}
        <RevealItem className="relative z-10 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end lg:mb-12 lg:bg-paper-50 lg:py-12 lg:pl-12">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 id="about-title" className="mt-5 font-display text-h2 text-ink-900">
            {t("title")}
          </h2>
          <p className="measure mt-7 text-lede text-ink-500">{t("body")}</p>

          <ul className="mt-10">
            {points.map((p) => (
              <li
                key={p}
                className="rule py-4 text-[15px] leading-relaxed text-ink-700"
              >
                {t(`points.${p}`)}
              </li>
            ))}
          </ul>
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* ─────────────── Отзывы ───────────────
   Начало тёмной главы. Кейсы идут как записи в журнале:
   крупный номер, заголовок, текст, результат под линейкой. */
function Reviews() {
  const t = useTranslations("reviews");
  const items = ["r1", "r2", "r3"] as const;

  return (
    <section
      aria-labelledby="reviews-title"
      className="relative overflow-hidden bg-ink-950 py-20 sm:py-28"
    >
      <Image
        src={reviewsBg}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(12,26,33,0.90),rgba(12,26,33,0.96))]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHead
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
          inverted
          titleId="reviews-title"
        />

        <Reveal className="mt-12 space-y-10 sm:space-y-12" stagger={0.14}>
          {items.map((key, i) => (
            <RevealItem key={key} as="article">
              <div className="rule-ink grid gap-6 pt-8 lg:grid-cols-12 lg:gap-12">
                <span className="font-display tnum text-5xl leading-none text-white/22 lg:col-span-1">
                  0{i + 1}
                </span>

                <div className="lg:col-span-6">
                  <h3 className="font-display text-h3 text-paper-50">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="measure mt-4 leading-relaxed text-paper-200/70">
                    {t(`items.${key}.text`)}
                  </p>
                </div>

                <div className="lg:col-span-4 lg:col-start-9">
                  <p className="eyebrow text-white/40">{t("resultLabel")}</p>
                  <p className="mt-3 leading-relaxed text-paper-100">
                    {t(`items.${key}.result`)}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────── CTA-полоса ───────────────
   Конец тёмной главы. Заголовок крупно, две кнопки без градиентов. */
function MidCta() {
  const t = useTranslations("cta");
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <Image
        src={coastImg}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(12,26,33,0.96),rgba(18,35,43,0.86))]" />

      <Reveal className="relative mx-auto max-w-4xl px-6 py-20 sm:py-24" stagger={0.12}>
        <RevealItem>
          <h2 className="font-display text-h2 text-paper-50">{t("title")}</h2>
        </RevealItem>
        <RevealItem>
          <p className="measure mt-6 text-lede text-paper-200/75">{t("subtitle")}</p>
        </RevealItem>
        <RevealItem>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={contact.telegram}
              target="_blank"
              rel="noopener noreferrer"
              data-track="telegram"
              className="group inline-flex items-center gap-3 bg-accent-500 px-8 py-4 text-base font-medium text-paper-50 transition-colors hover:bg-accent-600"
            >
              <Send className="h-4 w-4" />
              {t("button")}
            </a>
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp"
              className="link-underline inline-flex items-center gap-2.5 text-base font-medium text-paper-100"
            >
              <WhatsappIcon className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </RevealItem>
      </Reveal>
    </section>
  );
}

/* ─────────────── FAQ ───────────────
   Ответы открыты сразу, в две колонки. Аккордеон прячет ровно то,
   ради чего человек и пришёл, и добавляет лишний клик. */
function Faq() {
  const t = useTranslations("faq");
  const items = ["q1", "q2", "q3", "q4", "q5"] as const;

  // Schema.org FAQPage — шанс на расширенный сниппет в Google
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: t(`items.${q}.q`),
      acceptedAnswer: { "@type": "Answer", text: t(`items.${q}.a`) },
    })),
  };

  return (
    <section
      aria-labelledby="faq-title"
      className="mx-auto max-w-6xl px-6 py-20 sm:py-24"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <SectionHead eyebrow={t("eyebrow")} title={t("title")} titleId="faq-title" />

      <Reveal as="ul" className="mt-10 grid gap-x-16 md:grid-cols-2" stagger={0.08}>
        {items.map((q) => (
          <RevealItem key={q} as="li" className="rule py-6">
            <h3 className="font-display text-h3 text-ink-900">{t(`items.${q}.q`)}</h3>
            <p className="measure mt-3 text-[15px] leading-relaxed text-ink-500">
              {t(`items.${q}.a`)}
            </p>
            {/* Вопрос про присяжного переводчика — единственное место, где
                честное «я не он» усиливается ссылкой на официальный реестр.
                В JSON-LD не идёт: там должен остаться чистый текст ответа. */}
            {q === "q1" && (
              <a
                href="https://www.gov.me/mpa/tumaci"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-3 inline-flex items-center gap-2 text-[13px] font-medium text-ink-900"
              >
                {t("registerLink")}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            )}
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}

/* ─────────────── Контакт + форма ─────────────── */
function Contact() {
  const t = useTranslations("form");
  const tb = useTranslations("hero.badges");

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-paper-200 py-20 sm:py-28"
    >
      <Reveal
        className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-12 lg:gap-16"
        stagger={0.14}
      >
        <RevealItem className="lg:col-span-5">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 id="contact-title" className="mt-5 font-display text-h2 text-ink-900">
            {t("title")}
          </h2>
          <p className="measure mt-6 text-lede text-ink-500">{t("subtitle")}</p>
          <p className="mt-6 text-sm text-ink-400">{tb("response")}</p>

          <p className="eyebrow mt-14">{t("orReach")}</p>
          <ul className="mt-5">
            <ContactLink
              href={contact.telegram}
              icon={<Send className="h-4 w-4" />}
              label="Telegram"
              value={contact.telegram.replace("https://", "")}
              external
              track="telegram"
            />
            <ContactLink
              href={contact.whatsapp}
              icon={<WhatsappIcon className="h-4 w-4" />}
              label="WhatsApp"
              value={contact.phone}
              external
              track="whatsapp"
            />
            <ContactLink
              href={contact.phoneHref}
              icon={<Phone className="h-4 w-4" />}
              label={t("phoneLabel")}
              value={contact.phone}
              track="phone"
            />
            <ContactLink
              href={`mailto:${contact.email}`}
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={contact.email}
              track="email"
            />
          </ul>
        </RevealItem>

        <RevealItem className="lg:col-span-6 lg:col-start-7">
          <div className="bg-paper-50 p-6 shadow-paper sm:p-10">
            <ContactForm />
          </div>
        </RevealItem>
      </Reveal>
    </section>
  );
}

function ContactLink({
  href,
  icon,
  label,
  value,
  external,
  track,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
  track?: string;
}) {
  return (
    <li className="rule">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        data-track={track}
        className="group flex items-baseline gap-5 py-4 transition-colors hover:text-accent-600"
      >
        <span className="flex-none translate-y-0.5 text-ink-300 transition-colors group-hover:text-accent-500">
          {icon}
        </span>
        <span className="eyebrow w-24 flex-none">{label}</span>
        <span className="text-[15px] text-ink-900 transition-colors group-hover:text-accent-600">
          {value}
        </span>
      </a>
    </li>
  );
}

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.05 8.05 0 0 1 2.37 5.72c0 4.47-3.64 8.11-8.12 8.11a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.19-.31a8.05 8.05 0 0 1-1.24-4.32c0-4.47 3.64-8.11 8.11-8.11Zm-3.06 4.3c-.15 0-.39.06-.6.28-.2.22-.79.77-.79 1.88 0 1.1.81 2.17.92 2.32.11.15 1.57 2.4 3.86 3.36.54.23.96.37 1.29.48.54.17 1.03.15 1.42.09.43-.06 1.33-.54 1.52-1.07.19-.53.19-.98.13-1.07-.06-.09-.2-.15-.43-.26-.22-.11-1.33-.66-1.53-.73-.2-.08-.36-.11-.51.11-.15.22-.58.73-.71.88-.13.15-.26.17-.48.06-.22-.11-.94-.35-1.79-1.11-.66-.59-1.11-1.32-1.24-1.54-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.23-.7-1.68-.18-.44-.37-.38-.51-.39l-.44-.01Z" />
    </svg>
  );
}

/* ─────────────── Футер ───────────────
   Без коробки-призыва и без фермы ссылок в четыре колонки:
   выходные данные издания. */
function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  const nav = [
    { href: "#services", key: "services" },
    { href: "#how", key: "howItWorks" },
    { href: "#about", key: "about" },
    { href: "#contact", key: "contact" },
  ] as const;
  const channels = [
    { href: contact.telegram, label: "Telegram", ext: true },
    { href: contact.whatsapp, label: "WhatsApp", ext: true },
    { href: contact.phoneHref, label: contact.phone, ext: false },
    { href: `mailto:${contact.email}`, label: contact.email, ext: false },
  ];

  return (
    <footer className="bg-ink-950 text-paper-200/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-h3 text-paper-50">{t("brand.name")}</p>
            <p className="measure-tight mt-4 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <p className="mt-4 text-sm text-paper-200/40">{t("footer.area")}</p>
          </div>

          <nav className="lg:col-span-3" aria-label={t("footer.navTitle")}>
            <p className="eyebrow text-white/35">{t("footer.navTitle")}</p>
            <ul className="mt-5 grid gap-3">
              {nav.map((n) => (
                <li key={n.key}>
                  <a
                    href={n.href}
                    className="link-underline text-sm transition-colors hover:text-paper-50"
                  >
                    {t(`nav.${n.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="eyebrow text-white/35">{t("footer.contactTitle")}</p>
            <ul className="mt-5 grid gap-3">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="link-underline text-sm transition-colors hover:text-paper-50"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="measure rule-ink mt-16 pt-8 text-xs leading-relaxed text-paper-200/40">
          {t("footer.disclaimer")}
        </p>

        <div className="mt-8 flex flex-col gap-3 text-xs text-paper-200/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} · {t("brand.name")} · {t("footer.rights")}
          </span>
          <Link
            href="/privacy"
            className="link-underline transition-colors hover:text-paper-50"
          >
            {t("footer.privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── Заголовок секции ───────────────
   Всегда по левому краю: центрованные шапки в каждой секции —
   один из главных признаков шаблонной вёрстки. */
function SectionHead({
  eyebrow,
  title,
  subtitle,
  inverted,
  titleId,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  inverted?: boolean;
  titleId?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className={`eyebrow ${inverted ? "text-white/40" : ""}`}>{eyebrow}</p>
      )}
      <h2
        id={titleId}
        className={`font-display text-h2 ${eyebrow ? "mt-5" : ""} ${
          inverted ? "text-paper-50" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`measure mt-6 text-lede ${
            inverted ? "text-paper-200/70" : "text-ink-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
