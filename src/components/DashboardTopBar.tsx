"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  BellIcon,
  UserCircle2Icon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";

export function DashboardTopBar() {
  const [userName, setUserName] = useState<string>("Usuario");
  const [role, setRole] = useState<string>("floreria");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<number>(0);

  useEffect(() => {
    if (typeof document !== "undefined") {
      // Obtener rol desde cookie
      const cookieRole =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("fp-role="))
          ?.split("=")[1] || "floreria";

      setRole(cookieRole);

      // Simular nombre de usuario (puedes reemplazar con Supabase)
      const name =
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("fp-name="))
          ?.split("=")[1]
          ?.replaceAll("%20", " ") || "Invitado";
      setUserName(name);

      // Simular conteo de notificaciones (puede venir de Supabase)
      const randomNoti = Math.floor(Math.random() * 3); // de 0 a 2
      setNotifications(randomNoti);
    }
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-40 flex items-center justify-between bg-white/70 px-5 py-3 backdrop-blur-md shadow-sm border-b border-white/50"
    >
      {/* 🌸 Logo / Marca */}
      <Link
        href={`/dashboard/${role}` as any}
        className="flex items-center gap-2 font-bold text-blossom-500 text-lg"
      >
        🌸 FloralPro3
      </Link>

      {/* 🔔 Notificaciones + Perfil */}
      <div className="flex items-center gap-4 relative">
        {/* Notificaciones */}
        <button
          onClick={() => alert("Centro de notificaciones pronto disponible 💌")}
          className="relative rounded-full p-2 hover:bg-blossom-50 transition"
        >
          <BellIcon size={22} className="text-slate-500" />
          {notifications > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blossom-400 text-[10px] text-white">
              {notifications}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full bg-white/60 px-3 py-1.5 shadow-inner shadow-white/30 hover:bg-white/80 transition"
          >
            <UserCircle2Icon size={26} className="text-blossom-400" />
            <span className="hidden sm:inline text-sm font-medium text-slate-700">
              {userName}
            </span>
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-52 rounded-2xl bg-white shadow-xl border border-slate-100 p-2 z-50"
              >
                <p className="px-3 py-2 text-sm text-slate-500">
                  Rol:{" "}
                  <span className="capitalize text-blossom-500 font-medium">
                    {role}
                  </span>
                </p>

                <Link
                  href={`/dashboard/${role}/perfil` as any}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blossom-50 text-sm text-slate-600 transition"
                >
                  <SettingsIcon size={18} className="text-blossom-400" />
                  Configuración
                </Link>

                <button
                  onClick={() => {
                    document.cookie =
                      "fp-role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.href = "/login";
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blossom-50 text-sm text-red-500 transition"
                >
                  <LogOutIcon size={18} />
                  Cerrar sesión
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
