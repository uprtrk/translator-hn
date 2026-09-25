"use client";

import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

// ⚠️ Ветвиться здесь по useReducedMotion() нельзя: на сервере хук всегда
// отдаёт false, поэтому SSR печатает reveal-item + opacity:0, а клиент с
// «уменьшить движение» рендерил обычный тег. React такое расхождение
// атрибутов не патчит — opacity:0 залипал, и страница оставалась пустой.
// Поэтому разметка всегда одна, а движение гасится из CSS
// (@media prefers-reduced-motion в globals.css).

// Пружина вместо линейного easing: элемент приезжает с весом,
// чуть «доседает» в конце — так двигаются физические предметы.
const spring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
  mass: 0.9,
};

type Props = {
  children: ReactNode;
  className?: string;
  /** Сдвиг старта, чтобы соседние блоки не выезжали синхронно. */
  delay?: number;
  /** Каскад для прямых детей: каждый следующий стартует чуть позже. */
  stagger?: number;
  as?: "div" | "section" | "ul" | "ol" | "li" | "figure";
};

export function Reveal({
  children,
  className,
  delay = 0,
  stagger,
  as = "div",
}: Props) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      // once: анимация не переигрывается при каждом проходе — иначе укачивает.
      // margin: старт чуть раньше нижней кромки, чтобы не «догоняло» глаз.
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: {},
        shown: {
          transition: stagger
            ? { staggerChildren: stagger, delayChildren: delay }
            : { delay },
        },
      }}
    >
      {stagger ? children : <RevealItem>{children}</RevealItem>}
    </Tag>
  );
}

// Отдельный элемент каскада. Кладётся прямым ребёнком в <Reveal stagger>.
export function RevealItem({
  children,
  className,
  style,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "li" | "figure" | "article";
}) {
  const Tag = motion[as];

  return (
    <Tag
      className={`reveal-item${className ? ` ${className}` : ""}`}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 28 },
        shown: { opacity: 1, y: 0, transition: spring },
      }}
    >
      {children}
    </Tag>
  );
}

export default Reveal;
