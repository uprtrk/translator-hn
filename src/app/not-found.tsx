import Link from "next/link";
import "./globals.css";

// Глобальная 404 (для путей вне локалей). Нет доступа к переводам —
// показываем на языке по умолчанию (RU).
export default function NotFound() {
  return (
    <html lang="ru">
      <body className="bg-ink-950 text-paper-200 antialiased">
        <div className="absolute inset-x-0 top-0 flex justify-center p-6">
          <Link href="/" className="font-display text-base font-extrabold tracking-tight text-white/90">
            Николай · Переводчик в Херцег-Нови
          </Link>
        </div>
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="font-display tnum text-8xl text-accent-500">404</p>
          <h1 className="mt-4 font-display text-2xl font-bold">Страница не найдена</h1>
          <p className="mt-2 max-w-sm text-white/70">
            Возможно, ссылка устарела или введена с ошибкой.
          </p>
          <Link
            href="/"
            className="mt-8 bg-paper-50 px-8 py-4 font-medium text-ink-950 transition-colors hover:bg-accent-500 hover:text-paper-50"
          >
            На главную
          </Link>
        </main>
      </body>
    </html>
  );
}
