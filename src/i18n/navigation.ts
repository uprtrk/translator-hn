import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Локаль-осведомлённые обёртки над навигацией Next.js
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
