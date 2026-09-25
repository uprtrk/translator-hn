"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, Send } from "lucide-react";
import LocaleSwitcher from "./LocaleSwitcher";
import { contact } from "@/config";

const NAV = [
  { href: "#services", key: "services" },
  { href: "#how", key: "howItWorks" },
  { href: "#about", key: "about" },
  { href: "#contact", key: "contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const tb = useTranslations("brand");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  // При открытии меню — фокус на первый пункт (для клавиатуры/скринридеров)
  useEffect(() => {
    if (open) menuRef.current?.querySelector<HTMLElement>("a")?.focus();
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: подсветка текущего раздела в меню
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Блокируем прокрутку фона при открытом меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Закрываем меню при переходе на десктоп (иначе фон остаётся заблокирован)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Escape закрывает меню
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      // Фокус-трап: Tab не выходит за пределы открытого меню
      if (e.key === "Tab" && menuRef.current) {
        const items = menuRef.current.querySelectorAll<HTMLElement>("a[href], button");
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-ink-100 bg-paper-100/92 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="font-display text-lg tracking-tight"
        >
          <span className={solid ? "text-ink-900" : "text-paper-50"}>
            {tb("short")}
          </span>
        </a>

        {/* Десктоп-навигация */}
        <nav aria-label={t("menu")} className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.key}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`link-underline text-sm font-medium transition-colors ${
                  isActive ? "is-active " : ""
                }${
                  solid
                    ? isActive
                      ? "text-accent-600"
                      : "text-ink-500 hover:text-ink-900"
                    : isActive
                      ? "text-paper-50"
                      : "text-paper-200/80 hover:text-paper-50"
                }`}
              >
                {t(item.key)}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className={
              solid
                ? ""
                : "bg-white/10 p-0.5 ring-1 ring-white/20 backdrop-blur"
            }
          >
            <LocaleSwitcher variant={solid ? "light" : "dark"} />
          </div>
          <a
            href={contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            data-track="telegram"
            className="hidden bg-accent-500 px-5 py-2.5 text-sm font-medium text-paper-50 transition-colors hover:bg-accent-600 sm:inline-block"
          >
            {t("cta")}
          </a>

          {/* Бургер (только мобилка) */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t("menu")}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:hidden ${
              solid ? "text-ink-900 hover:bg-paper-200" : "text-paper-50 hover:bg-white/10"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {open && (
        <nav
          ref={menuRef}
          id="mobile-menu"
          aria-label={t("menu")}
          className="border-t border-ink-100 bg-paper-100 px-6 py-6 md:hidden"
        >
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rule block py-3.5 text-base font-medium text-ink-700 transition-colors hover:text-accent-600"
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={contact.telegram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            data-track="telegram"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-accent-500 px-4 py-3.5 text-base font-medium text-paper-50 transition-colors hover:bg-accent-600"
          >
            <Send className="h-4 w-4" />
            {t("cta")}
          </a>
        </nav>
      )}
    </header>
  );
}
