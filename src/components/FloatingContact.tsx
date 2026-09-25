"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { contact } from "@/config";

// Плавающая кнопка Telegram — появляется после прокрутки за пределы hero.
export default function FloatingContact() {
  const t = useTranslations("nav");
  const [show, setShow] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.18 },
    );
    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  const visible = show && !contactVisible;

  return (
    <a
      href={contact.telegram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("cta")}
      data-track="telegram_float"
      className={`group fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-ink-900 p-4 text-paper-50 shadow-paper transition-all duration-300 hover:bg-accent-500 sm:bottom-8 sm:right-8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <Send className="h-5 w-5 flex-none" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[12rem] group-hover:opacity-100">
        {t("cta")}
      </span>
    </a>
  );
}
