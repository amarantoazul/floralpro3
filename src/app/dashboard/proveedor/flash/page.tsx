"use client";

import Link from "next/link";
import type { Route } from "next";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DashboardCard } from "@/components/DashboardCard";
import {
  AlertTriangle,
  Building2,
  ClipboardList,
  ShoppingBag,
  Tag,
  TrendingUp,
  UserRound,
  Zap,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { DashboardTopBar } from "@/components/DashboardTopBar";

type Metrics = {
  proveedor?: string;
  pedidosHoy: number;
  stockBajo: number;
  productosPublicados: number;
  porcentajeCumplimiento: number;
  cancelaciones: number;
  pedidosRevision: number;
};

const initialMetrics: Metrics = {
  pedidosHoy: 0,
  stockBajo: 0,
  productosPublicados: 0,
  porcentajeCumplimiento: 0,
  cancelaciones: 0,
  pedidosRevision: 0,
};

type QuickAction = {
  label: string;
  href: Route;
  icon: any;
  accent: string;
};

const quickActions: QuickAction[] = [
  {
    label: "Perfil",
    href: "/dashboard/proveedor/perfil" as Route,
    icon: UserRound,
    accent: "from-blossom-100 to-white",
  },
  {
    label: "Sucursales",
    href: "/dashboard/proveedor/sucursales" as Route,
    icon: Building2,
    accent: "from-blossom-100 to-blossom-50",
  },
  {
    label: "Catálogo",
    href: "/dashboard/proveedor/catalogo" as Route,
    icon: Tag,
    accent: "from-blossom-100 to-white",
  },
  {
    label: "Pedidos",
    href: "/dashboard/proveedor/pedidos" as Route,
    icon: ClipboardList,
    accent: "from-blossom-200 to-blossom-50",
  },
  {
    label: "Flash",
    href: "/dashboard/proveedor/flash" as Route,
    icon: Zap,
    accent: "from-blossom-100 to-white",
  },
  {
    label: "Tienda",
    href: "/dashboard/proveedor/tienda" as Route,
    icon: ShoppingBag,
    accent: "from-blossom-100 to-blossom-50",
  },
];

export default function ProveedorDashboardPage() {
  const [metrics, setMetrics] = useState<Metrics>(initialMetrics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/proveedor/metrics", {
          cache: "no-store",
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "No se pudieron cargar las métricas");
        }
        const data: Metrics = await response.json();
        setMetrics(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "No se pudo cargar el dashboard.");
      } finally {
        setLoading(false);
      }
    };
    void fetchMetrics();
  }, []);

  const pedidosHoy = loading ? "--" : metrics.pedidosHoy.toString();
  const stockBajo = loading ? "--" : metrics.stockBajo.toString();
  const productosPublicados = loading
    ? "--"
    : metrics.productosPublicados.toString();
  const porcentajeCumplimiento = useMemo(() => {
    if (loading) return "--";
    const value = metrics.porcentajeCumplimiento ?? 0;
    return `${value.toFixed(1)}%`;
  }, [loading, metrics.porcentajeCumplimiento]);

  const handleLogout = async () => {
    try {
      setSigningOut(true);
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (err) {
      console.error("Error al cerrar sesión", err);
      setSigningOut(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-blossom-50/40">
      <DashboardTopBar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-10"
      >
        {/* Encabezado */}
        <header className="rounded-3xl bg-white/90 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blossom-300">
            Dashboard Proveedor
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Hola {metrics.proveedor || "Proveedor"}
          </h1>
          <p className="text-sm text-slate-500">
            Controla inventario, pedidos y flashes desde una sola vista.
          </p>
        </header>

        {/* Acciones rápidas */}
        <section className="rounded-3xl bg-white/90 p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex flex-col items-center gap-2 rounded-3xl border border-white/60 bg-white/80 p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.accent} text-blossom-600 shadow-inner`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Métricas */}
        {error && (
          <p className="rounded-3xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-500">
            {error}
          </p>
        )}

        <section className="grid gap-4">
          <div className="rounded-3xl bg-gradient-to-br from-blossom-600 to-blossom-400 p-6 text-white shadow-lg">
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">
              Nuevos pedidos de hoy
            </p>
            <p className="mt-3 text-5xl font-semibold leading-none">
              {pedidosHoy}
            </p>
            <p className="mt-2 text-sm text-white/80">
              Órdenes que llegaron en las últimas 24 horas.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-blossom-100 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Artículos con poco stock</p>
              <p className="mt-3 text-4xl font-semibold text-slate-900">
                {stockBajo}
              </p>
              <p className="text-xs text-slate-400">
                Revisa inventario para evitar quiebres.
              </p>
            </div>
            <div className="rounded-3xl border border-blossom-100 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Artículos publicados</p>
              <p className="mt-3 text-4xl font-semibold text-slate-900">
                {productosPublicados}
              </p>
              <p className="text-xs text-slate-400">
                Productos visibles actualmente en tienda.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-green-50 p-3 text-green-600">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Pedidos aceptados a tiempo
                </p>
                <p className="text-xs text-slate-400">Porcentaje del día</p>
              </div>
            </div>
            <p className="mt-3 text-4xl font-semibold text-slate-900">
              {porcentajeCumplimiento}
            </p>
            {!loading && (
              <p className="text-xs text-green-500">↑ Ritmo estable</p>
            )}
          </div>
        </section>

        {/* Cancelaciones y revisión */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Pedidos cancelados</p>
                <p className="mt-2 text-4xl font-semibold text-slate-900">
                  {loading ? "--" : metrics.cancelaciones}
                </p>
              </div>
              <div className="rounded-2xl bg-red-50 p-3 text-red-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Revisa mensajes y ajusta tiempos para reducir cancelaciones.
            </p>
          </div>

          <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Pedidos en revisión</p>
                <p className="mt-2 text-4xl font-semibold text-slate-900">
                  {loading ? "--" : metrics.pedidosRevision}
                </p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-3 text-amber-500">
                <ClipboardList className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Atiende estas órdenes para mantener la tasa de aceptación.
            </p>
          </div>
        </section>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={signingOut}
          className="mt-2 rounded-full border border-blossom-200 bg-white px-5 py-3 text-sm font-semibold text-blossom-600 shadow-sm transition hover:bg-blossom-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {signingOut ? "Cerrando sesión..." : "Cerrar sesión"}
        </button>
      </motion.main>
    </div>
  );
}
