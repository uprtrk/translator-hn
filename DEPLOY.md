# Деплой и запуск

Сайт на Next.js 16. Деплоить проще всего на **Vercel** (бесплатного тарифа хватает с запасом).

## 0. Что заполнить перед публикацией

1. **Ключ формы** — [.env.local](.env.local), `NEXT_PUBLIC_WEB3FORMS_KEY`
   Зайти на https://web3forms.com → ввести email `nikolaistukov38@gmail.com` → скопировать Access Key. Заявки будут приходить на этот email.
2. **Домен сайта** — `NEXT_PUBLIC_SITE_URL` (после того как узнаешь адрес на Vercel или подключишь свой домен).
3. Контакты уже вставлены: Telegram @uprtrk, тел. +382 67 551 020, email — см. [src/config.ts](src/config.ts).

> ⚠️ `.env.local` не попадает в git (так и надо). На Vercel эти переменные задаются в настройках проекта (шаг 2 ниже).

## Вариант A — через GitHub (рекомендую, авто-деплой при пуше)

1. Создать репозиторий на GitHub и запушить папку `translator-hn`.
2. На https://vercel.com → **Add New → Project** → импортировать репозиторий.
3. Framework определится как Next.js автоматически. В разделе **Environment Variables** добавить:
   - `NEXT_PUBLIC_WEB3FORMS_KEY` = ключ с web3forms
   - `NEXT_PUBLIC_SITE_URL` = `https://<твой-проект>.vercel.app` (или свой домен)
4. **Deploy**. Через ~1 минуту сайт живой. Каждый `git push` → авто-обновление.

## Вариант B — без GitHub, через CLI

```bash
cd translator-hn
npx vercel            # первый раз попросит войти в аккаунт и ответить на пару вопросов
npx vercel --prod     # публикация в прод
```
Переменные окружения добавить: `npx vercel env add NEXT_PUBLIC_WEB3FORMS_KEY` и `... NEXT_PUBLIC_SITE_URL`.

## После деплоя

- Прописать `NEXT_PUBLIC_SITE_URL` реальным адресом и передеплоить (чтобы OpenGraph/sitemap/JSON-LD ссылались на правильный домен).
- Свой домен (`.me`, `.com`) подключается в Vercel → Settings → Domains.
- Отправить `sitemap.xml` в Google Search Console.

## Локальная разработка

```bash
npm run dev     # http://localhost:3000
npm run build   # проверить прод-сборку
```

## Что ещё осталось наполнить (см. SPEC.md, п.12)

- Настоящие отзывы клиентов (сейчас условные) — `messages/*.json`, ключ `reviews`.
- Портрет Николая вместо фото города в секции «Обо мне» — положить в `public/images/` и заменить `town.jpg` в [page.tsx](src/app/[locale]/page.tsx).
- Опыт/стаж в блоке «Обо мне» (текст `about.body`).
