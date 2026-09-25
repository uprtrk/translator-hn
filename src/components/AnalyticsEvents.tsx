"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

// Отправляет клики по элементам с [data-track] как события в Vercel Analytics.
export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (el?.dataset.track) track(el.dataset.track);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
