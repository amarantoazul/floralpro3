import { DashboardCard } from "@/components/DashboardCard";
import { DashboardTopBar } from "@/components/DashboardTopBar";
import { motion } from "framer-motion";

const cards = [
  {
    icon: "🚚",
    title: "Despachos",
    value: "56",
    caption: "Pedidos listos para enviar hoy",
    accent: "bg-blossom-100"
  },
  {
    icon: "📦",
    title: "Inventario",
    value: "1.240",
    caption: "Tallos disponibles en tiempo real",
    accent: "bg-blossom-200"
  },
  {
    icon: "⏱️",
    title: "SLA",
    value: "92%",
    caption: "Entregas a tiempo esta semana",
    accent: "bg-blossom-100"
  }
];

export default function ProveedorDashboardPage() {
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
            Dashboard proveedor
          </p>
          <h1 className="text-3xl font-semibold">Gestión logística simplificada</h1>
          <p className="text-sm text-slate-600">
            Controla inventario y despachos con métricas claves desde tu dispositivo móvil.
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