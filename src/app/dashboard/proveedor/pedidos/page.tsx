"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, CheckCircle, XCircle, Clock3 } from "lucide-react";

type Pedido = {
  id: string;
  comprador_id: string;
  estado: string;
  total: number;
  notas?: string;
  created_at: string;
};

const estadoOptions = [
  { value: "pendiente", label: "Pendiente", icon: <Clock3 size={16} /> },
  { value: "aceptado", label: "Aceptado", icon: <CheckCircle size={16} /> },
  { value: "en_revision", label: "En revisión", icon: <Package size={16} /> },
  { value: "cancelado", label: "Cancelado", icon: <XCircle size={16} /> },
];

export default function ProveedorPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchPedidos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/proveedor/pedidos", { cache: "no-store" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "No se pudieron cargar los pedidos");
      }
      const data: Pedido[] = await res.json();
      setPedidos(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPedidos();
  }, []);

  const updateEstado = async (pedidoId: string, estado: string) => {
    try {
      setUpdatingId(pedidoId);
      const res = await fetch("/api/proveedor/pedidos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pedidoId, estado }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo actualizar el pedido");
      await fetchPedidos();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blossom-50/30 to-white px-4 py-10 text-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-5xl space-y-6"
      >
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blossom-300">
            Pedidos recibidos
          </p>
          <h1 className="text-3xl font-semibold text-blossom-500">
            Coordina tus entregas
          </h1>
          <p className="text-sm text-slate-500">
            Actualiza el estado de cada solicitud y mantén informadas a las florerías.
          </p>
        </header>

        {error && (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-500">
            {error}
          </p>
        )}

        <section className="rounded-3xl border border-blossom-100 bg-white/90 p-6 shadow-sm">
          {loading ? (
            <p className="text-sm text-slate-500">Cargando pedidos...</p>
          ) : pedidos.length === 0 ? (
            <p className="text-sm text-slate-500">Aún no recibes pedidos.</p>
          ) : (
            <div className="space-y-4">
              {pedidos.map((pedido) => (
                <motion.article
                  key={pedido.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-inner"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-800">
                        Pedido #{pedido.id.slice(0, 8)}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Cliente {pedido.comprador_id?.slice(0, 6) ?? "-"} •{" "}
                        {new Date(pedido.created_at).toLocaleDateString("es-MX")}
                      </p>
                      {pedido.notas && (
                        <p className="text-sm text-slate-500 mt-1">
                          {pedido.notas}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-blossom-500">
                        ${pedido.total?.toFixed?.(2) ?? "0.00"}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        {pedido.estado}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {estadoOptions.map((option) => (
                      <button
                        key={option.value}
                        disabled={updatingId === pedido.id}
                        onClick={() => updateEstado(pedido.id, option.value)}
                        className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition ${
                          pedido.estado === option.value
                            ? "border-blossom-400 bg-blossom-50 text-blossom-600"
                            : "border-slate-200 bg-white text-slate-500 hover:border-blossom-200"
                        }`}
                      >
                        {option.icon}
                        {option.label}
                      </button>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </motion.div>
    </div>
  );
}
