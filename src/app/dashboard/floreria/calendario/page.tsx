"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { supabase } from "@/lib/supabaseClient";

type Evento = {
  id: string;
  title: string;
  date: string;
  type: "pedido" | "flash";
};

export default function CalendarioFloreriaPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback temporal (para desarrollo)
  const fallbackEventos: Evento[] = [
    {
      id: "demo-1",
      title: "Entrega: Pedido de rosas",
      date: new Date().toISOString().split("T")[0],
      type: "pedido",
    },
    {
      id: "demo-2",
      title: "Flash urgente: 200 tulipanes",
      date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      type: "flash",
    },
  ];

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        setLoading(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();
        const user = session?.user;
        if (!user) throw new Error("Usuario no autenticado.");

        // --- 1️⃣ Pedidos donde el usuario es comprador (florería)
        const { data: pedidos, error: pedidosError } = await supabase
          .from("pedidos")
          .select("id, fecha_entrega, estado")
          .eq("comprador_id", user.id);

        if (pedidosError) throw pedidosError;

        // --- 2️⃣ Flash publicados por el usuario
        const { data: flash, error: flashError } = await supabase
          .from("flash")
          .select("id, descripcion, fecha_entrega")
          .eq("floreria_id", user.id);

        if (flashError) throw flashError;

        // --- 3️⃣ Combinar y transformar
        const mappedPedidos =
          pedidos?.map((p) => ({
            id: p.id,
            title: `Entrega: Pedido (${p.estado})`,
            date: p.fecha_entrega,
            type: "pedido" as const,
          })) ?? [];

        const mappedFlash =
          flash?.map((f) => ({
            id: f.id,
            title: `Flash: ${f.descripcion}`,
            date: f.fecha_entrega,
            type: "flash" as const,
          })) ?? [];

        const combined = [...mappedPedidos, ...mappedFlash];

        setEventos(combined.length ? combined : fallbackEventos);
      } catch (err: any) {
        console.error("Error cargando eventos:", err.message);
        setError("No se pudieron cargar los eventos del calendario.");
        setEventos(fallbackEventos);
      } finally {
        setLoading(false);
      }
    };

    void fetchEventos();
  }, []);

  const renderEventContent = (eventInfo: any) => {
    const tipo = eventInfo.event.extendedProps.type;
    const color =
      tipo === "pedido"
        ? "bg-blossom-300 text-white"
        : "bg-yellow-200 text-yellow-800";
    return (
      <div className={`px-2 py-1 rounded-md text-xs font-medium ${color}`}>
        {eventInfo.event.title}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <header>
        <h1 className="text-3xl font-semibold text-blossom-500">
          Calendario de Actividades 📅
        </h1>
        <p className="text-slate-600">
          Consulta tus entregas, pedidos y publicaciones flash.
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
      ) : (
        <div className="bg-white rounded-3xl shadow-md border border-blossom-100 p-6">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={esLocale}
            events={eventos}
            eventContent={renderEventContent}
            height="auto"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "",
            }}
          />
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 bg-red-50 py-2 px-3 rounded-xl text-center">
          ⚠️ {error}
        </p>
      )}
    </motion.div>
  );
}
