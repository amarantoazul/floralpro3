import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/login", "/register", "/seleccion-rol"];
const roleDashboards: Record<string, string> = {
  floreria: "/dashboard/floreria",
  proveedor: "/dashboard/proveedor",
  agente: "/dashboard/agente",
  admin: "/dashboard/admin",
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir rutas públicas
  if (publicRoutes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Verifica cookie de sesión y rol
  const accessToken = req.cookies.get("sb-access-token")?.value;
  const role = req.cookies.get("fp-role")?.value;

  if (!accessToken || !role) {
    // No autenticado → redirigir al login
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Control por rol: solo puede acceder a su dashboard
  const allowedPath = roleDashboards[role];
  if (pathname.startsWith("/dashboard") && !pathname.startsWith(allowedPath)) {
    const url = req.nextUrl.clone();
    url.pathname = allowedPath;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
  ],
};
