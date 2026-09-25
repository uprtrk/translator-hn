"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { track } from "@vercel/analytics";
import { Loader2, Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { contact } from "@/config";

type Status = "idle" | "sending" | "success" | "error";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

export default function ContactForm() {
  const t = useTranslations("form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [service, setService] = useState("interpreting");
  const successRef = useRef<HTMLDivElement>(null);

  // Клик по «Обсудить задачу» на карточке услуги подставляет её в форму
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLElement>("[data-service]");
      if (link?.dataset.service) setService(link.dataset.service);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Переносим фокус на сообщение об успехе (для скринридеров)
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!WEB3FORMS_KEY) {
      setStatus("error");
      return;
    }

    const form = e.currentTarget;
    setStatus("sending");

    const data = Object.fromEntries(new FormData(form).entries());
    // Honeypot: если заполнено — это бот
    if (data.botcheck) {
      setStatus("success");
      return;
    }

    const serviceLabel = t(`serviceOptions.${data.service}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Новая заявка (${serviceLabel}) — сайт переводчика`,
          from_name: "Сайт переводчика · Херцег-Нови",
          language: locale,
          ...data,
        }),
      });
      // Web3Forms может вернуть 200 с success:false (напр. неверный ключ),
      // поэтому проверяем тело ответа, а не только res.ok.
      const json = await res.json().catch(() => null);
      if (res.ok && json?.success) {
        setStatus("success");
        track("form_submit", { service: String(data.service ?? "") });
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center bg-accent-50 p-10 text-center outline-none"
      >
        <span className="mb-5 inline-flex text-accent-500">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <p className="font-display text-h3 text-ink-900">{t("success")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline mt-5 text-sm font-medium text-ink-700"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  const fieldClass =
    "w-full border-0 border-b border-ink-200 bg-transparent px-0 py-3 text-ink-900 outline-none transition-colors focus:border-accent-500 disabled:text-ink-300 placeholder:text-ink-300";
  const labelClass = "eyebrow mb-2 block";

  return (
    <form onSubmit={handleSubmit} aria-describedby="form-privacy" className="space-y-5">
      <div className="rule pt-5">
        <div className="flex items-start gap-3">
          <span className="inline-flex flex-none translate-y-0.5 text-accent-500">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-base text-ink-900">
              {t("fastTitle")}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-500">
              {t("fastText")}
            </p>
          </div>
        </div>
      </div>

      {/* honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={`${labelClass} sm:min-h-[2rem]`} htmlFor="name">
            {t("name")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            className={fieldClass}
            disabled={!WEB3FORMS_KEY}
          />
        </div>
        <div>
          <label className={`${labelClass} sm:min-h-[2rem]`} htmlFor="contact-method">
            {t("contact")}
          </label>
          <input
            id="contact-method"
            name="contact"
            type="text"
            required
            maxLength={80}
            placeholder={t("contactPlaceholder")}
            className={fieldClass}
            disabled={!WEB3FORMS_KEY}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="service">
          {t("service")}
        </label>
        <select
          id="service"
          name="service"
          className={fieldClass}
          value={service}
          onChange={(e) => setService(e.target.value)}
          disabled={!WEB3FORMS_KEY}
        >
          <option value="interpreting">{t("serviceOptions.interpreting")}</option>
          <option value="documents">{t("serviceOptions.documents")}</option>
          <option value="relocation">{t("serviceOptions.relocation")}</option>
          <option value="other">{t("serviceOptions.other")}</option>
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder={t("messagePlaceholder")}
          className={`${fieldClass} resize-none`}
          disabled={!WEB3FORMS_KEY}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending" || !WEB3FORMS_KEY}
          className="inline-flex w-full items-center justify-center gap-2 bg-ink-900 px-8 py-4 text-base font-medium text-paper-50 transition-colors hover:bg-accent-500 active:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {t("sending")}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {t("submit")}
            </>
          )}
        </button>
        <a
          href={contact.telegram}
          target="_blank"
          rel="noopener noreferrer"
          data-track="telegram_form"
          className="inline-flex w-full items-center justify-center gap-2 border border-ink-200 px-8 py-4 text-base font-medium text-ink-800 transition-colors hover:border-accent-500 hover:text-accent-600 sm:w-auto"
        >
          <Send className="h-4 w-4" />
          Telegram
        </a>
      </div>

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 border-l-2 border-red-500 bg-red-50/60 px-4 py-3 text-sm leading-relaxed text-red-800">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
          {!WEB3FORMS_KEY ? t("configError") : t("error")}
        </p>
      )}

      <p id="form-privacy" className="text-xs text-ink-400">
        {t("privacy")}
      </p>
    </form>
  );
}
