"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

type Pedido = {
  id: string;
  estado: string;
  total: number;
  created_at: string;
  proveedor?: {
    nombre_comercial?: string;
  };
  notas?: string;
};

export default function MisPedidosFloreriaPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 1. Cargar pedidos desde la API
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch("/api/pedidos", { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudieron cargar los pedidos");
        const data = await res.json();
        setPedidos(data);
      } catch (err: any) {
        console.error("Error al cargar pedidos:", err.message);
        setError("No se pudieron cargar tus pedidos.");
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();
  }, []);

  // 🔹 2. Funciones auxiliares
  const getEstadoColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "aceptado":
        return "bg-green-50 text-green-600 border-green-200";
      case "rechazado":
        return "bg-red-50 text-red-600 border-red-200";
      case "cancelado":
        return "bg-gray-50 text-gray-600 border-gray-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "aceptado":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rechazado":
      case "cancelado":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blossom-50 via-white to-white px-4 py-10 text-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-5xl"
      >
        <header className="mb-10">
          <h1 className="text-3xl font-semibold text-blossom-500">🌸 Mis pedidos</h1>
          <p className="text-slate-600">
            Revisa tus pedidos realizados a proveedores, agentes o productores.
          </p>
        </header>

        {/* Estado de carga o error */}
        {loading && (
          <p className="text-slate-500 text-sm">Cargando tus pedidos...</p>
        )}
        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        {/* Lista de pedidos */}
        {!loading && !error && (
          <>
            {pedidos.length === 0 ? (
              <p className="text-slate-500 text-sm">
                No tienes pedidos realizados aún.
              </p>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {pedidos.map((pedido) => (
                    <motion.div
                      key={pedido.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        {getEstadoIcon(pedido.estado)}
                        <div>
                          <h3 className="font-semibold text-slate-800">
                            Pedido #{pedido.id.slice(0, 8)}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {pedido.proveedor?.nombre_comercial ||
                              "Proveedor desconocido"}
                          </p>
                          <p className="text-xs text-slate-400">
                            {new Date(pedido.created_at).toLocaleDateString(
                              "es-ES",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${getEstadoColor(
                            pedido.estado
                          )}`}
                        >
                          {pedido.estado}
                        </span>
                        <p className="text-sm mt-1 font-semibold text-blossom-500">
                          ${pedido.total.toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}
