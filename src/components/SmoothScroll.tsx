"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Инерционный скролл. Именно он даёт ощущение «тяжёлого», дорогого сайта:
// страница едет с довеском, а не рывками по 100px, как в браузере по умолчанию.
export default function SmoothScroll() {
  useEffect(() => {
    // Кому укачивает — тому нативный скролл. Это не опция, а доступность.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Экспоненциальное затухание: быстрый старт, долгая мягкая остановка.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Якорные ссылки должны ехать тем же движком, иначе скролл дёргается.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
