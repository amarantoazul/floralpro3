"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-pink-100 bg-pink-50/90 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-pink-600"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-base font-bold text-pink-500 shadow-sm shadow-pink-100">
            FP
          </span>
          FloralPro3
        </Link>

        {/* 👇 Aquí el cambio importante */}
        <Link href={{ pathname: "/login" }}>
          <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-pink-200 transition hover:scale-[1.02] cursor-pointer">
            Iniciar sesión
          </span>
        </Link>
      </div>
    </header>
  );
}
