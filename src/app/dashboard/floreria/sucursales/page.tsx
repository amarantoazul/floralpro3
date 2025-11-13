"use client";

import { useEffect, useState, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Trash2 } from "lucide-react";

type Sucursal = {
  id: string;
  floreria_id: string;
  nombre: string;
  direccion?: string;
  ciudad?: string;
  estado?: string;
  pais?: string;
  telefono?: string;
  created_at?: string;
};

export default function SucursalesFloreriaPage() {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    estado: "",
    pais: "",
    telefono: "",
  });
  const [floreriaId, setFloreriaId] = useState<string | null>(null);

  // 🔹 1. Obtener la florería actual
  useEffect(() => {
    const fetchFloreria = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;

      if (!userId) return;

      const { data, error } = await supabase
        .from("florerias")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error obteniendo florería:", error.message);
      } else {
        setFloreriaId(data.id);
      }
    };

    fetchFloreria();
  }, []);

  // 🔹 2. Cargar sucursales de la florería
  useEffect(() => {
    if (!floreriaId) return;

    const fetchSucursales = async () => {
      const { data, error } = await supabase
        .from("sucursales_floreria")
        .select("*")
        .eq("floreria_id", floreriaId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error cargando sucursales:", error.message);
      } else {
        setSucursales(data);
      }

      setLoading(false);
    };

    fetchSucursales();
  }, [floreriaId]);

  // 🔹 3. Crear nueva sucursal
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!floreriaId) return;

    const { error } = await supabase.from("sucursales_floreria").insert([
      {
        floreria_id: floreriaId,
        ...form,
      },
    ]);

    if (error) {
      console.error("Error al crear sucursal:", error.message);
      alert("❌ No se pudo crear la sucursal.");
    } else {
      alert("✅ Sucursal creada correctamente.");
      setForm({
        nombre: "",
        direccion: "",
        ciudad: "",
        estado: "",
        pais: "",
        telefono: "",
      });
      const { data } = await supabase
        .from("sucursales_floreria")
        .select("*")
        .eq("floreria_id", floreriaId)
        .order("created_at", { ascending: false });
      setSucursales(data ?? []);
    }
  };

  // 🔹 4. Eliminar sucursal
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("¿Deseas eliminar esta sucursal?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("sucursales_floreria")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error al eliminar sucursal:", error.message);
      alert("❌ No se pudo eliminar la sucursal.");
    } else {
      setSucursales((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blossom-50 via-white to-white px-4 py-10 text-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl"
      >
        <header className="mb-10">
          <h1 className="text-3xl font-semibold text-blossom-500">
            🌸 Mis Sucursales
          </h1>
          <p className="text-slate-600">
            Administra las ubicaciones físicas de tu florería.
          </p>
        </header>

        {/* Formulario de nueva sucursal */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-3xl bg-white/70 p-6 shadow-lg backdrop-blur"
        >
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-blossom-400" />
            Nueva sucursal
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="rounded-xl border border-slate-200 p-3 text-sm"
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              className="rounded-xl border border-slate-200 p-3 text-sm"
            />
            <input
              type="text"
              placeholder="Dirección"
              value={form.direccion}
              onChange={(e) => setForm({ ...form, direccion: e.target.value })}
              className="rounded-xl border border-slate-200 p-3 text-sm sm:col-span-2"
            />
            <input
              type="text"
              placeholder="Ciudad"
              value={form.ciudad}
              onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
              className="rounded-xl border border-slate-200 p-3 text-sm"
            />
            <input
              type="text"
              placeholder="Estado"
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
              className="rounded-xl border border-slate-200 p-3 text-sm"
            />
            <input
              type="text"
              placeholder="País"
              value={form.pais}
              onChange={(e) => setForm({ ...form, pais: e.target.value })}
              className="rounded-xl border border-slate-200 p-3 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={!floreriaId}
            className="mt-2 w-full rounded-full bg-blossom-400 px-5 py-3 text-white font-medium hover:bg-blossom-500 transition disabled:opacity-60"
          >
            Guardar sucursal
          </button>
        </form>

        {/* Lista de sucursales */}
        <section className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Sucursales registradas
          </h2>

          {loading ? (
            <p className="text-slate-500">Cargando...</p>
          ) : sucursales.length === 0 ? (
            <p className="text-slate-500">Aún no tienes sucursales registradas.</p>
          ) : (
            <AnimatePresence>
              {sucursales.map((s) => (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-between items-center rounded-2xl bg-white p-4 shadow-sm border border-slate-100"
                >
                  <div>
                    <h3 className="font-medium text-slate-800">{s.nombre}</h3>
                    <p className="text-sm text-slate-600">
                      {s.direccion} · {s.ciudad}, {s.estado} · {s.pais}
                    </p>
                    <p className="text-xs text-slate-500">{s.telefono}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </section>
      </motion.div>
    </div>
  );
}
