import { DashboardCard } from "@/components/DashboardCard";
import { DashboardTopBar } from "@/components/DashboardTopBar";
import { motion } from "framer-motion";

const cards = [
  {
    icon: "📞",
    title: "Contactos",
    value: "35",
    caption: "Cadenas coordinadas activamente",
    accent: "bg-blossom-100"
  },
  {
    icon: "🗺️",
    title: "Rutas",
    value: "12",
    caption: "Entregas monitoreadas en vivo",
    accent: "bg-blossom-200"
  },
  {
    icon: "✅",
    title: "Contratos",
    value: "21",
    caption: "Acuerdos en seguimiento",
    accent: "bg-blossom-100"
  }
];

export default function AgenteDashboardPage() {
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
            Dashboard agente
          </p>
          <h1 className="text-3xl font-semibold">Coordinación en movimiento</h1>
          <p className="text-sm text-slate-600">
            Mantén visibilidad de contactos, rutas y contratos con tarjetas táctiles.
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