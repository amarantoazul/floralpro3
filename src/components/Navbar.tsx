"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="sticky top-0 z-20 w-full border-b border-white/60 bg-white/80 backdrop-blur-sm"
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-base font-semibold text-slate-900"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-blossom-100 via-blossom-200 to-blossom-300 text-base font-bold text-blossom-500 shadow-sm shadow-pink-100/60">
            FP
          </span>
          FloralPro3
        </Link>

        {/* Botón de inicio de sesión */}
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blossom-200 via-blossom-300 to-blossom-400 px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:scale-[1.03]"
        >
          Iniciar sesión
        </Link>
      </div>
    </motion.header>
  );
}
