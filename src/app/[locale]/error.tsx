"use client";

// Границы ошибок для сегмента локали. Показывается при рантайм-сбое.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink-950 px-6 text-center text-paper-200">
      <p className="font-display text-6xl text-accent-500">:(</p>
      <h1 className="mt-4 font-display text-2xl font-bold">Что-то пошло не так</h1>
      <p className="mt-2 max-w-sm text-white/70">
        Попробуйте обновить страницу. Если не помогает — напишите в Telegram.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 bg-paper-50 px-8 py-4 font-medium text-ink-950 transition-colors hover:bg-accent-500 hover:text-paper-50"
      >
        Обновить
      </button>
    </div>
  );
}
