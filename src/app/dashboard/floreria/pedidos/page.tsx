"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

type Pedido = {
  id: string;
  proveedor_id: string;
  estado: string;
  total: number;
  created_at: string;
};

type Proveedor = {
  id: string;
  nombre?: string;
};

export default function PedidosFloreriaPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [proveedores, setProveedores] = useState<Record<string, Proveedor>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Fallback temporal ---
  const fallbackPedidos: Pedido[] = [
    {
      id: "PED-001",
      proveedor_id: "prov-123",
      estado: "pendiente",
      total: 180,
      created_at: new Date().toISOString(),
    },
    {
      id: "PED-002",
      proveedor_id: "prov-124",
      estado: "aceptado",
      total: 320,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        setLoading(true);

        // Obtener sesión actual
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const user = session?.user;
        if (!user) throw new Error("Usuario no autenticado.");

        // Consultar pedidos donde el comprador sea esta florería
        const { data: pedidosData, error: pedidosError } = await supabase
          .from("pedidos")
          .select("id, proveedor_id, estado, total, created_at")
          .eq("comprador_id", user.id)
          .order("created_at", { ascending: false });

        if (pedidosError) throw pedidosError;

        const pedidosList = pedidosData?.length ? pedidosData : fallbackPedidos;
        setPedidos(pedidosList);

        // Obtener nombres de proveedores
        const proveedorIds = pedidosList.map((p) => p.proveedor_id);
        if (proveedorIds.length > 0) {
          const { data: provsData } = await supabase
            .from("usuarios")
            .select("id, nombre")
            .in("id", proveedorIds);

          const provMap: Record<string, Proveedor> = {};
          provsData?.forEach((p) => (provMap[p.id] = p));
          setProveedores(provMap);
        }
      } catch (err: any) {
        console.error("Error al cargar pedidos:", err.message);
        setError("No se pudieron cargar los pedidos.");
        setPedidos(fallbackPedidos);
      } finally {
        setLoading(false);
      }
    };

    void fetchPedidos();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-blossom-500">
          Mis pedidos 🌸
        </h1>
        <p className="text-slate-600">
          Consulta el estado de tus pedidos realizados a proveedores, agentes o productores.
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="h-10 w-10 rounded-full border-4 border-blossom-300 border-t-transparent"
          />
        </div>
      ) : error ? (
        <p className="text-red-500 bg-red-50 p-4 rounded-2xl shadow-sm">
          ⚠️ {error}
        </p>
      ) : pedidos.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center text-slate-500 border border-dashed border-blossom-200">
          🌼 No tienes pedidos aún. <br />
          <span className="text-slate-400 text-sm">
            Explora la tienda y realiza tu primera compra.
          </span>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-blossom-50 text-blossom-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Proveedor</th>
                <th className="px-4 py-3 text-left">Estado</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-right">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-slate-100 hover:bg-blossom-50/30 transition"
                >
                  <td className="px-4 py-3 font-medium">{p.id}</td>
                  <td className="px-4 py-3">
                    {proveedores[p.proveedor_id]?.nombre || "Proveedor"}
                  </td>
                  <td className="px-4 py-3 capitalize">
                    {p.estado === "aceptado" && (
                      <span className="text-green-600 bg-green-50 px-2 py-1 rounded-xl text-xs font-semibold">
                        Aceptado
                      </span>
                    )}
                    {p.estado === "rechazado" && (
                      <span className="text-red-600 bg-red-50 px-2 py-1 rounded-xl text-xs font-semibold">
                        Rechazado
                      </span>
                    )}
                    {p.estado === "pendiente" && (
                      <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded-xl text-xs font-semibold">
                        Pendiente
                      </span>
                    )}
                    {p.estado === "cancelado" && (
                      <span className="text-slate-600 bg-slate-100 px-2 py-1 rounded-xl text-xs font-semibold">
                        Cancelado
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-blossom-500">
                    ${p.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-500">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
