import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Переводчик · Херцег-Нови",
    short_name: "Переводчик ЧГ",
    description:
      "Устный и письменный перевод и помощь релокантам в Черногории — Херцег-Нови.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0d3546",
    lang: "ru",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
