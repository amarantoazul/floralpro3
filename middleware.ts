import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "fp-role";
const DASHBOARD_MATCHER = "/dashboard";

function getRoleRedirect(role: string) {
  return `/dashboard/${role}`;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const roleCookie = request.cookies.get(COOKIE_NAME)?.value;

  // Protege rutas del dashboard
  if (pathname.startsWith(DASHBOARD_MATCHER)) {
    if (!roleCookie) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    const segments = pathname.split("/").filter(Boolean);
    const currentRole = segments[1];
    if (currentRole && currentRole !== roleCookie) {
      return NextResponse.redirect(new URL(getRoleRedirect(roleCookie), request.url));
    }
  }

  // Evita mostrar login/register a usuarios ya logueados
  if ((pathname === "/login" || pathname === "/register") && roleCookie) {
    return NextResponse.redirect(new URL(getRoleRedirect(roleCookie), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"]
};
