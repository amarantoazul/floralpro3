"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  ClipboardList,
  Zap,
  User,
  Menu,
  X,
} from "lucide-react";

export function DashboardNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const cookieRole = document.cookie
        .split("; ")
        .find((row) => row.startsWith("fp-role="))
        ?.split("=")[1];
      setRole(cookieRole || "floreria");
    }
  }, []);

  // Menús por rol
  const roleNavs: Record<
    string,
    { href: string; label: string; icon: JSX.Element }[]
  > = {
    floreria: [
      { href: "/dashboard/floreria", label: "Inicio", icon: <Home size={20} /> },
      { href: "/dashboard/floreria/tienda", label: "Tienda", icon: <ShoppingBag size={20} /> },
      { href: "/dashboard/floreria/pedidos", label: "Pedidos", icon: <ClipboardList size={20} /> },
      { href: "/dashboard/floreria/flash", label: "Flash", icon: <Zap size={20} /> },
      { href: "/dashboard/floreria/perfil", label: "Perfil", icon: <User size={20} /> },
    ],
    proveedor: [
      { href: "/dashboard/proveedor", label: "Inicio", icon: <Home size={20} /> },
      { href: "/dashboard/proveedor/catalogo", label: "Catálogo", icon: <ShoppingBag size={20} /> },
      { href: "/dashboard/proveedor/pedidos", label: "Pedidos", icon: <ClipboardList size={20} /> },
      { href: "/dashboard/proveedor/flash", label: "Flash", icon: <Zap size={20} /> },
      { href: "/dashboard/proveedor/perfil", label: "Perfil", icon: <User size={20} /> },
    ],
    agente: [
      { href: "/dashboard/agente", label: "Inicio", icon: <Home size={20} /> },
      { href: "/dashboard/agente/tienda", label: "Tienda", icon: <ShoppingBag size={20} /> },
      { href: "/dashboard/agente/pedidos", label: "Pedidos", icon: <ClipboardList size={20} /> },
      { href: "/dashboard/agente/flash", label: "Flash", icon: <Zap size={20} /> },
      { href: "/dashboard/agente/perfil", label: "Perfil", icon: <User size={20} /> },
    ],
    productor: [
      { href: "/dashboard/productor", label: "Inicio", icon: <Home size={20} /> },
      { href: "/dashboard/productor/catalogo", label: "Catálogo", icon: <ShoppingBag size={20} /> },
      { href: "/dashboard/productor/pedidos", label: "Pedidos", icon: <ClipboardList size={20} /> },
      { href: "/dashboard/productor/flash", label: "Flash", icon: <Zap size={20} /> },
      { href: "/dashboard/productor/perfil", label: "Perfil", icon: <User size={20} /> },
    ],
  };

  const navItems = roleNavs[role] || roleNavs["floreria"];

  return (
    <>
      {/* 🌸 NAV INFERIOR - MÓVIL */}
      <motion.nav
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-4 left-1/2 z-50 flex w-[92%] max-w-md -translate-x-1/2 justify-around rounded-full bg-white/80 px-4 py-2 shadow-xl backdrop-blur-md sm:hidden"
      >
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href as any}
              className={`flex flex-col items-center text-[11px] font-medium transition ${
                active ? "text-blossom-500" : "text-slate-400"
              }`}
            >
              <motion.div whileTap={{ scale: 0.9 }}>{item.icon}</motion.div>
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </motion.nav>

      {/* 💻 TOP BAR - DESKTOP */}
      <div className="hidden sm:flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <Link
          href={`/dashboard/${role || "floreria"}` as any}
          className="flex items-center gap-2 text-xl font-bold text-blossom-500"
        >
          🌸 FloralPro
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-xl hover:bg-blossom-50 transition text-blossom-400"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* 🪄 DRAWER LATERAL ANIMADO */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl rounded-l-3xl flex flex-col p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-semibold text-blossom-500 capitalize">
                  {role || "floreria"}
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl hover:bg-blossom-50 transition text-slate-500"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href as any}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        active
                          ? "bg-gradient-to-r from-blossom-100 to-blossom-50 text-blossom-500"
                          : "text-slate-600 hover:bg-blossom-50"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DashboardNav;
