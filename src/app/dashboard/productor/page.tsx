"use client";
import { motion } from "framer-motion";
import { DashboardCard } from "@/components/DashboardCard";
import { DashboardTopBar } from "@/components/DashboardTopBar";

export default function ProductorDashboardPage() {
  const cards = [
    {
      icon: "🌱",
      title: "Cosechas activas",
      value: "8",
      caption: "Producción en curso esta semana",
      accent: "bg-blossom-100",
    },
    {
      icon: "📦",
      title: "Pedidos pendientes",
      value: "5",
      caption: "Solicitudes de proveedores y agentes",
      accent: "bg-blossom-200",
    },
    {
      icon: "📊",
      title: "Tallos disponibles",
      value: "2,450",
      caption: "Inventario total actualizado",
      accent: "bg-blossom-100",
    },
    {
      icon: "🌸",
      title: "Calidad promedio",
      value: "94%",
      caption: "Porcentaje de flores grado Premium",
      accent: "bg-blossom-200",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardTopBar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container flex flex-1 flex-col gap-8 py-10"
      >
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blossom-300">
            Dashboard Productor
          </p>
          <h1 className="text-3xl font-semibold">Controla tu producción floral</h1>
          <p className="text-sm text-slate-600">
            Supervisa cosechas, pedidos y calidad de tu producción.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <DashboardCard key={card.title} {...card} />
          ))}
        </div>
      </motion.main>
    </div>
  );
}
