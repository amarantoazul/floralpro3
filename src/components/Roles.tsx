"use client";

import { motion } from "framer-motion";

const roles = [
  {
    title: "Proveedor",
    description:
      "Centraliza inventarios, catálogos y disponibilidad en tiempo real para tus clientes.",
    accent: "bg-blossom-100",
    icon: "🌺",
  },
  {
    title: "Florería",
    description:
      "Haz pedidos ágiles, gestiona entregas y obtén insights sobre tus productos estrella.",
    accent: "bg-blossom-200",
    icon: "🌷",
  },
  {
    title: "Productor",
    description:
      "Conecta tu producción con la demanda y anticipa necesidades con dashboards móviles.",
    accent: "bg-blossom-100",
    icon: "🌻",
  },
  {
    title: "Agente",
    description:
      "Coordina cadenas de suministro, contratos y logística desde un solo panel colaborativo.",
    accent: "bg-blossom-200",
    icon: "🌼",
  },
];

export function Roles() {
  return (
    <section
      id="roles"
      className="py-14 bg-gradient-to-b from-white via-white to-blossom-50/30"
    >
      <div className="container space-y-10">
        {/* Encabezado */}
        <div className="text-center space-y-3">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-2xl font-semibold text-slate-900 sm:text-3xl"
          >
            Cuatro roles, una sola plataforma
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-xl text-sm text-slate-600 sm:text-base"
          >
            FloralPro3 potencia a cada actor de la cadena floral con herramientas
            móviles y colaborativas.
          </motion.p>
        </div>

        {/* Grid de roles */}
        <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
          {roles.map((role, index) => (
            <motion.article
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="floating-card p-6 text-left hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${role.accent} text-2xl shadow-inner shadow-pink-100`}
                >
                  {role.icon}
                </span>
                <h3 className="text-lg font-semibold text-slate-900">
                  {role.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {role.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
