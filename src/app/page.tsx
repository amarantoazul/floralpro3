"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Flower2Icon,
  TruckIcon,
  SproutIcon,
  HandshakeIcon,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50 to-blossom-50 text-slate-800">
      {/* 🌸 Encabezado */}
      <header className="flex items-center justify-between px-6 sm:px-12 py-6">
        <div className="flex items-center gap-2">
          <Flower2Icon size={28} className="text-blossom-500" />
          <span className="text-xl font-semibold text-blossom-500">
            FloralPro3
          </span>
        </div>

        <button
          onClick={() => router.push("/login")}
          className="bg-gradient-to-r from-blossom-400 to-pink-400 text-white px-5 py-2 rounded-full font-medium shadow hover:opacity-90 transition"
        >
          Iniciar sesión
        </button>
      </header>

      {/* 💫 Sección principal */}
      <main className="flex flex-col items-center text-center px-6 sm:px-8 py-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="uppercase text-sm font-semibold tracking-wider text-blossom-400 mb-4"
        >
          Plataforma SaaS Floral
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-slate-800 max-w-3xl mb-6"
        >
          El ecosistema inteligente para la cadena floral en Latinoamérica
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-slate-600 max-w-2xl mb-10"
        >
          FloralPro3 sincroniza pedidos, inventarios y relaciones comerciales en
          una experiencia moderna para florerías, productores, proveedores y
          agentes de venta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => router.push("/seleccion-rol")}
            className="px-8 py-3 bg-gradient-to-r from-pink-400 to-blossom-400 text-white rounded-full font-semibold shadow hover:opacity-90 transition"
          >
            Conoce los roles
          </button>

          <button
            onClick={() =>
              window.open("https://calendly.com/", "_blank", "noopener,noreferrer")
            }
            className="px-8 py-3 border border-blossom-300 text-blossom-500 rounded-full font-semibold hover:bg-blossom-50 transition"
          >
            Agenda una charla
          </button>
        </motion.div>
      </main>

      {/* 🌷 Sección de roles */}
      <section className="px-6 sm:px-16 py-16 bg-gradient-to-b from-white via-rose-50 to-pink-50 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
          Cuatro roles, una sola plataforma
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-10">
          FloralPro3 potencia a cada actor de la cadena floral con herramientas
          móviles y colaborativas.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl bg-white p-6 shadow-md hover:shadow-lg transition"
          >
            <TruckIcon size={40} className="mx-auto text-blossom-400 mb-3" />
            <h3 className="text-lg font-semibold text-slate-800">Proveedor</h3>
            <p className="text-sm text-slate-600 mt-2">
              Centraliza inventarios, catálogos y disponibilidad en tiempo real.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl bg-white p-6 shadow-md hover:shadow-lg transition"
          >
            <Flower2Icon size={40} className="mx-auto text-blossom-400 mb-3" />
            <h3 className="text-lg font-semibold text-slate-800">Florería</h3>
            <p className="text-sm text-slate-600 mt-2">
              Haz pedidos ágiles, gestiona entregas y analiza tus productos.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl bg-white p-6 shadow-md hover:shadow-lg transition"
          >
            <SproutIcon size={40} className="mx-auto text-blossom-400 mb-3" />
            <h3 className="text-lg font-semibold text-slate-800">Productor</h3>
            <p className="text-sm text-slate-600 mt-2">
              Conecta tu producción con la demanda y anticipa necesidades.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl bg-white p-6 shadow-md hover:shadow-lg transition"
          >
            <HandshakeIcon size={40} className="mx-auto text-blossom-400 mb-3" />
            <h3 className="text-lg font-semibold text-slate-800">Agente</h3>
            <p className="text-sm text-slate-600 mt-2">
              Coordina logística, contratos y relaciones entre actores florales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 🌼 Pie de página */}
      <footer className="py-8 text-center text-slate-400 text-sm border-t border-rose-100">
        <p>© {new Date().getFullYear()} FloralPro3. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
