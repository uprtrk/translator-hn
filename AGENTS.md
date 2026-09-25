<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Проект: сайт переводчика · Херцег-Нови

Личный лендинг переводчика Николая (Черногория) на 3 языках.

## Стек
Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind v4 · next-intl (RU `/`, EN `/en`, SR `/sr`) · lucide-react · Web3Forms (форма) · @vercel/analytics.

## Команды
- `npm run dev` — http://localhost:3000
- `npm run build` — прод-сборка (проверять после правок)
- `npx tsc --noEmit` — тип-чек
- При 404 на всех страницах после build↔dev: `rm -rf .next` перед `npm run dev` (кэш Turbopack).

## Где что
- `src/app/[locale]/page.tsx` — вся главная (секции — функции в одном файле).
- `src/app/[locale]/layout.tsx` — метаданные, OpenGraph, JSON-LD, viewport.
- `src/app/[locale]/privacy/page.tsx` — политика конфиденциальности.
- `src/app/[locale]/opengraph-image.tsx` — брендовая OG-картинка (next/og).
- `src/app/{sitemap,robots,manifest}.ts`, `icon.svg`, `not-found.tsx`, `[locale]/error.tsx`.
- `src/components/` — Header, LocaleSwitcher, ContactForm, Reveal (RevealInit), FloatingContact, ScrollProgress, AnalyticsEvents.
- `src/config.ts` — контакты и `siteUrl`.
- `messages/{ru,en,sr}.json` — ВСЕ тексты; массивы через `t.raw(...)`.

## Конвенции
- Тексты только в `messages/*.json`; три файла держать синхронными по ключам.
- Палитра `sea-*` + акцент `terracotta-*`. Иконки плоские/мягкие, без глянцевых градиентных плиток.
- Появление секций — `data-reveal` (управляет RevealInit), с учётом `prefers-reduced-motion`.
- Аналитика — `data-track="..."` на ссылке. Предвыбор услуги в форме — `data-service`.

## Перед запуском (см. DEPLOY.md)
`NEXT_PUBLIC_WEB3FORMS_KEY` и `NEXT_PUBLIC_SITE_URL`; заменить заглушки отзывов/аватаров и `town.jpg` на реальные.
