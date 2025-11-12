"use client";

import { motion } from "framer-motion";

export default function FloreriaDashboardPage() {
  const cards = [
    { emoji: "🌷", title: "Pedidos activos", value: "12", caption: "Pedidos en proceso" },
    { emoji: "📦", title: "Inventario", value: "340", caption: "Tallos disponibles" },
    { emoji: "💰", title: "Ventas hoy", value: "$1,230", caption: "Últimas 24 horas" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <header>
        <h1 className="text-3xl font-semibold text-blossom-500">
          Panel de Florería 🌸
        </h1>
        <p className="text-slate-600">
          Administra tus pedidos, clientes y productos en tiempo real.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl bg-white shadow-md border border-blossom-100 p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl">{card.emoji}</div>
            <h2 className="text-lg font-semibold text-slate-800 mt-2">{card.title}</h2>
            <p className="text-2xl font-bold text-blossom-500">{card.value}</p>
            <p className="text-sm text-slate-500">{card.caption}</p>
          </div>
        ))}
      </section>
    </motion.div>
  );
}
