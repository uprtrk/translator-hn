// Базовый URL сайта (для абсолютных ссылок, OpenGraph, sitemap, robots).
// На Vercel задаётся через переменную NEXT_PUBLIC_SITE_URL — она всегда главнее.
// Пока своего домена нет, запасной вариант — поддомен Vercel.
// Когда купим домен: меняем NEXT_PUBLIC_SITE_URL в настройках Vercel (и строку ниже).
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://translator-hn.vercel.app";

// Контакты и внешние ссылки.
export const contact = {
  telegram: "https://t.me/uprtrk",
  whatsapp: "https://wa.me/38267551020",
  phone: "+382 67 551 020",
  phoneHref: "tel:+38267551020",
  email: "nikolaistukov38@gmail.com",
};
