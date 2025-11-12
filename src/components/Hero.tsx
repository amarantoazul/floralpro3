"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="container flex flex-1 flex-col items-center justify-center gap-8 py-12 text-center sm:py-16"
    >
      <span className="floating-card inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blossom-400">
        Plataforma SaaS floral
      </span>

      <div className="space-y-4">
        <h1 className="text-[1.9rem] leading-tight text-slate-900 sm:text-4xl md:text-5xl font-semibold">
          El ecosistema inteligente para la cadena floral en Latinoamérica
        </h1>
        <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
          FloralPro3 sincroniza pedidos, inventarios y relaciones comerciales
          en una experiencia móvil pensada para equipos que necesitan velocidad
          y claridad.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4 mt-4">
        <a
          href="#roles"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blossom-200 via-blossom-300 to-blossom-400 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:scale-[1.03]"
        >
          Conoce los roles
        </a>
        <a
          href="mailto:hola@floralpro3.com"
          className="inline-flex items-center justify-center rounded-full border border-blossom-200 bg-white/80 px-6 py-3 text-sm font-semibold text-blossom-400 shadow-md shadow-pink-100/70 transition hover:border-blossom-300 hover:text-blossom-500"
        >
          Agenda una charla
        </a>
      </div>
    </motion.section>
  );
}
