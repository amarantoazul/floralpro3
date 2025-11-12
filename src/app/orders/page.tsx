import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container flex flex-1 flex-col justify-center gap-6 pt-8"
      >
        <h1 className="text-2xl font-semibold">Pedidos móviles en camino</h1>
        <p>
          Conecta rápidamente con tus proveedores y gestiona pedidos pendientes desde una experiencia optimizada para pantallas táctiles.
        </p>
      </motion.main>
    </div>
  );
}