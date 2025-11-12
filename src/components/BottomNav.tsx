"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/orders", label: "Pedidos", icon: "📦" },
  { href: "/catalog", label: "Catálogo", icon: "🌸" },
  { href: "/profile", label: "Perfil", icon: "👤" },
];

export function BottomNav() {
  const pathname = usePathname() ?? "/";

  // Ocultar la barra inferior en pantallas de login, registro o dashboard
  if (
    pathname.startsWith("/dashboard") ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 24,
        delay: 0.2,
      }}
      className="fixed inset-x-0 bottom-3 z-50 mx-auto flex w-[calc(100%-2.5rem)] max-w-md items-center justify-between rounded-3xl bg-white/90 p-2 shadow-lg shadow-pink-100/70 ring-1 ring-white/60 backdrop-blur-md md:hidden"
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
  key={item.href}
  href={item.href as any}
  className="relative flex flex-1 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium text-slate-500 transition"
>

            {/* Indicador de la pestaña activa */}
            {isActive && (
              <motion.span
                layoutId="nav-indicator"
                className="absolute inset-0 rounded-2xl bg-blossom-100/70"
                transition={{ duration: 0.2 }}
              />
            )}
            <span className="relative text-lg">{item.icon}</span>
            <span
              className={`relative ${
                isActive ? "text-slate-900" : "text-slate-500"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </motion.nav>
  );
}
