"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

type Flash = {
  id: string;
  descripcion: string;
  cantidad: number;
  fecha_entrega: string;
  estado: string;
  created_at: string;
};

export default function FlashFloreriaPage() {
  const [flashs, setFlashs] = useState<Flash[]>([]);
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState<number | null>(null);
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fallbackFlashs: Flash[] = [
    {
      id: "demo-1",
      descripcion: "Necesito 300 tallos de rosa blanca hoy mismo",
      cantidad: 300,
      fecha_entrega: new Date().toISOString().split("T")[0],
      estado: "pendiente",
      created_at: new Date().toISOString(),
    },
  ];

  // Cargar los flash del usuario actual
  useEffect(() => {
    const fetchFlashs = async () => {
      try {
        setFetching(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();
        const user = session?.user;
        if (!user) throw new Error("Usuario no autenticado.");

        const { data, error: flashError } = await supabase
          .from("flash")
          .select("id, descripcion, cantidad, fecha_entrega, estado, created_at")
          .eq("floreria_id", user.id)
          .order("created_at", { ascending: false });

        if (flashError) throw flashError;
        setFlashs(data?.length ? data : fallbackFlashs);
      } catch (err: any) {
        console.error("Error cargando flash:", err.message);
        setError("No se pudieron cargar tus publicaciones de flash.");
        setFlashs(fallbackFlashs);
      } finally {
        setFetching(false);
      }
    };

    void fetchFlashs();
  }, []);

  // Crear nuevo flash
  const handleCrearFlash = async (e: FormEvent) => {
    e.preventDefault();

    if (!descripcion.trim() || !cantidad || !fechaEntrega) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) throw new Error("Usuario no autenticado.");

      const { error: insertError } = await supabase.from("flash").insert({
        floreria_id: user.id,
        descripcion,
        cantidad,
        fecha_entrega: fechaEntrega,
        estado: "pendiente",
      });

      if (insertError) throw insertError;

      setDescripcion("");
      setCantidad(null);
      setFechaEntrega("");
      alert("✅ Flash publicado correctamente.");
      location.reload();
    } catch (err: any) {
      console.error("Error creando flash:", err.message);
      setError("No se pudo publicar el flash.");
    } finally {
      setLoading(false);
    }
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
          Publicaciones Flash ⚡
        </h1>
        <p className="text-slate-600">
          Publica solicitudes urgentes de flores o insumos para recibir
          ofertas de productores y proveedores.
        </p>
      </header>

      {/* --- Formulario --- */}
      <motion.form
        onSubmit={handleCrearFlash}
        className="rounded-3xl bg-white shadow-md border border-blossom-100 p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Crear nuevo flash
        </h2>

        <div>
          <label className="block text-sm font-medium text-blossom-500">
            Descripción del pedido urgente
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ejemplo: Necesito 200 tallos de girasol para entrega mañana"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-inner focus:border-blossom-300 focus:ring-2 focus:ring-blossom-200"
            rows={3}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-blossom-500">
              Cantidad requerida
            </label>
            <input
              type="number"
              min={1}
              value={cantidad ?? ""}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-inner focus:border-blossom-300 focus:ring-2 focus:ring-blossom-200"
              placeholder="Ejemplo: 300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blossom-500">
              Fecha de entrega deseada
            </label>
            <input
              type="date"
              value={fechaEntrega}
              onChange={(e) => setFechaEntrega(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-inner focus:border-blossom-300 focus:ring-2 focus:ring-blossom-200"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 py-2 px-3 rounded-xl text-center">
            ⚠️ {error}
          </p>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gradient-to-r from-blossom-300 via-blossom-400 to-blossom-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg disabled:opacity-70"
        >
          {loading ? "Publicando..." : "Publicar Flash"}
        </motion.button>
      </motion.form>

      {/* --- Lista de flash --- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">
          Mis publicaciones Flash
        </h2>

        {fetching ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              className="h-10 w-10 rounded-full border-4 border-blossom-300 border-t-transparent"
            />
          </div>
        ) : flashs.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center text-slate-500 border border-dashed border-blossom-200">
            🌼 Aún no has publicado ningún flash.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {flashs.map((flash) => (
              <motion.div
                key={flash.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-white border border-blossom-100 shadow-md p-5 space-y-2 hover:shadow-lg transition"
              >
                <p className="font-semibold text-slate-800 line-clamp-2">
                  {flash.descripcion}
                </p>
                <p className="text-sm text-slate-600">
                  Cantidad: <strong>{flash.cantidad}</strong>
                </p>
                <p className="text-sm text-slate-500">
                  Entrega:{" "}
                  {new Date(flash.fecha_entrega).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xs text-slate-400">
                  Publicado el{" "}
                  {new Date(flash.created_at).toLocaleDateString("es-MX")}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    flash.estado === "pendiente"
                      ? "bg-yellow-50 text-yellow-600"
                      : flash.estado === "ofertado"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {flash.estado}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}
