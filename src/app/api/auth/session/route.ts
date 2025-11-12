import { NextResponse } from "next/server";

const COOKIE_NAME = "fp-role";

export async function POST(request: Request) {
  const body = await request.json();
  const role = typeof body?.role === "string" ? body.role : null;

  if (!role) {
    return NextResponse.json({ success: false, message: "Rol inválido" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: COOKIE_NAME,
    value: role,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0
  });
  return response;
}