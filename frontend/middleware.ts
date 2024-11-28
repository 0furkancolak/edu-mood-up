import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);

const protectedRoutes = ["dashboard"];
const publicRoutes = [
  "login",
  "signup",
  "confirm-account",
  "forgot-password",
  "reset-password",
  "verify-mfa",
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path.split("/")[2]);
  const isPublicRoute = publicRoutes.includes(path.split("/")[2]);

  const accessToken = req.cookies.get("accessToken")?.value;

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (!path.startsWith("/api")) {
    return handleI18nRouting(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!assets|.*\\..*|_next).*)"],
};
