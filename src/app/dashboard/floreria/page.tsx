"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

type Pedido = {
  id: string;
  estado: string;
  total: number;
};

type Inventario = {
  id: string;
  producto: string;
  cantidad: number;
};

export default function FloreriaDashboardPage() {
  const [pedidos, setPedidos] = useState<Pedido[] | null>(null);
  const [inventario, setInventario] = useState<Inventario[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- Simulación de datos (fallback) ---
  const fallbackData = {
    pedidos: [
      { id: "P-001", estado: "En proceso", total: 120 },
      { id: "P-002", estado: "Completado", total: 240 },
    ],
    inventario: [
      { id: "I-001", producto: "Rosa roja", cantidad: 120 },
      { id: "I-002", producto: "Tulipán amarillo", cantidad: 85 },
      { id: "I-003", producto: "Lirio blanco", cantidad: 60 },
    ],
  };

  // --- Cargar datos desde Supabase ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Obtener sesión actual
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const user = session?.user;
        if (!user) throw new Error("Usuario no autenticado");

        // Consultar pedidos e inventario de esta florería
        const [{ data: pedidosData, error: pedidosError }, { data: invData, error: invError }] =
          await Promise.all([
            supabase.from("pedidos").select("id, estado, total").eq("floreria_id", user.id),
            supabase.from("inventario").select("id, producto, cantidad").eq("floreria_id", user.id),
          ]);

        if (pedidosError || invError) throw new Error("Error al consultar datos");

        // Asignar resultados o fallback
        setPedidos(pedidosData?.length ? pedidosData : fallbackData.pedidos);
        setInventario(invData?.length ? invData : fallbackData.inventario);
      } catch (err: any) {
        console.error("Error cargando datos:", err.message);
        setError(err.message);
        setPedidos(fallbackData.pedidos);
        setInventario(fallbackData.inventario);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  const totalPedidos = pedidos?.length ?? 0;
  const totalInventario = inventario?.reduce((sum, i) => sum + i.cantidad, 0) ?? 0;
  const totalVentas = pedidos?.reduce((sum, p) => sum + p.total, 0) ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <header>
        <h1 className="text-3xl font-semibold text-blossom-500">Panel de Florería 🌸</h1>
        <p className="text-slate-600">
          Administra tus pedidos, inventario y ventas en tiempo real.
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
          ⚠️ Error al cargar datos: {error}
        </p>
      ) : (
        <>
          {/* --- Tarjetas resumen --- */}
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white shadow-md border border-blossom-100 p-6">
              <div className="text-4xl">📋</div>
              <h2 className="text-lg font-semibold text-slate-800 mt-2">Pedidos activos</h2>
              <p className="text-2xl font-bold text-blossom-500">{totalPedidos}</p>
              <p className="text-sm text-slate-500">Órdenes registradas</p>
            </div>

            <div className="rounded-3xl bg-white shadow-md border border-blossom-100 p-6">
              <div className="text-4xl">🌼</div>
              <h2 className="text-lg font-semibold text-slate-800 mt-2">Inventario</h2>
              <p className="text-2xl font-bold text-blossom-500">{totalInventario}</p>
              <p className="text-sm text-slate-500">Tallos disponibles</p>
            </div>

            <div className="rounded-3xl bg-white shadow-md border border-blossom-100 p-6">
              <div className="text-4xl">💰</div>
              <h2 className="text-lg font-semibold text-slate-800 mt-2">Ventas Totales</h2>
              <p className="text-2xl font-bold text-blossom-500">${totalVentas}</p>
              <p className="text-sm text-slate-500">Monto acumulado</p>
            </div>
          </section>

          {/* --- Listado de pedidos --- */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Últimos pedidos</h2>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-blossom-50 text-blossom-500 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Estado</th>
                    <th className="px-4 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos?.map((p) => (
                    <tr
                      key={p.id}
                      className="border-t border-slate-100 hover:bg-blossom-50/30 transition"
                    >
                      <td className="px-4 py-3">{p.id}</td>
                      <td className="px-4 py-3">{p.estado}</td>
                      <td className="px-4 py-3 text-right">${p.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </motion.div>
  );
}
