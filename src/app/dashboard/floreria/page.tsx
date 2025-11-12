import { DashboardCard } from "@/components/DashboardCard";
import { DashboardTopBar } from "@/components/DashboardTopBar";
import { motion } from "framer-motion";

const cards = [
  {
    icon: "🛒",
    title: "Pedidos en curso",
    value: "18",
    caption: "Solicitudes en seguimiento activo",
    accent: "bg-blossom-100"
  },
  {
    icon: "💐",
    title: "Favoritos",
    value: "24",
    caption: "Variedades destacadas por tus clientes",
    accent: "bg-blossom-200"
  },
  {
    icon: "💡",
    title: "Sugerencias",
    value: "5",
    caption: "Ideas de bundles listos para publicar",
    accent: "bg-blossom-100"
  }
];

export default function FloreriaDashboardPage() {
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
            Dashboard florería
          </p>
          <h1 className="text-3xl font-semibold">Pedidos y catálogo al alcance</h1>
          <p className="text-sm text-slate-600">
            Visualiza tus productos estrella y pedidos prioritarios desde tu celular.
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