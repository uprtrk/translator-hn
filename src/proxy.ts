import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Пропускаем API, внутренние пути Next и файлы со статикой
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
