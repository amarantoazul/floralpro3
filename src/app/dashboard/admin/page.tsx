import { DashboardCard } from "@/components/DashboardCard";
import { DashboardTopBar } from "@/components/DashboardTopBar";
import { motion } from "framer-motion";

const cards = [
  {
    icon: "📊",
    title: "Pedidos activos",
    value: "128",
    caption: "Órdenes coordinadas esta semana",
    accent: "bg-blossom-100"
  },
  {
    icon: "🤝",
    title: "Proveedores",
    value: "42",
    caption: "Equipos conectados a la plataforma",
    accent: "bg-blossom-200"
  },
  {
    icon: "⚙️",
    title: "Automatizaciones",
    value: "8",
    caption: "Flujos automatizados en ejecución",
    accent: "bg-blossom-100"
  }
];

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardTopBar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container flex flex-1 flex-col gap-8 py-10"
      >
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blossom-300">
            Dashboard admin
          </p>
          <h1 className="text-3xl font-semibold">Control general de la operación</h1>
          <p className="text-sm text-slate-600">
            Supervisa actividad, automatizaciones y equipos con una vista diseñada para móviles.
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