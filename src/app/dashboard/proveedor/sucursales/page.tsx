"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion } from "framer-motion";

interface Sucursal {
  id?: string;
  nombre: string;
  direccion?: string;
  ciudad: string;
  estado?: string;
  pais?: string;
  telefono?: string;
  horario?: string;
}

const initialForm: Sucursal = {
  nombre: "",
  direccion: "",
  ciudad: "",
  estado: "",
  pais: "",
  telefono: "",
  horario: "",
};

export default function ProveedorSucursalesPage() {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [form, setForm] = useState<Sucursal>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSucursales = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/proveedor/sucursales", { cache: "no-store" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "No se pudieron cargar las sucursales");
      }
      const data: Sucursal[] = await res.json();
      setSucursales(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchSucursales();
  }, []);

  const handleChange = (field: keyof Sucursal, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!form.nombre.trim() || !form.ciudad.trim()) {
      setError("Nombre y ciudad son obligatorios");
      setSaving(false);
      return;
    }

    try {
      const method = editingId ? "PATCH" : "POST";
      const payload = editingId ? { ...form, id: editingId } : form;
      const res = await fetch("/api/proveedor/sucursales", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo guardar");

      resetForm();
      await fetchSucursales();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (sucursal: Sucursal) => {
    setEditingId(sucursal.id ?? null);
    setForm({ ...initialForm, ...sucursal });
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const confirmDelete = window.confirm("¿Eliminar sucursal?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/proveedor/sucursales?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo eliminar");
      await fetchSucursales();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blossom-50/30 to-white px-4 py-10 text-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-6xl space-y-8"
      >
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blossom-300">
            Sucursales
          </p>
          <h1 className="text-3xl font-semibold text-blossom-500">
            Cobertura logística
          </h1>
          <p className="text-sm text-slate-500">
            Administra los puntos de entrega y preparación de pedidos que verán las florerías.
          </p>
        </header>

        {error && (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-500">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-blossom-100 bg-white/80 p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-blossom-500">Nombre</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="Ej. Centro CDMX"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-blossom-500">Ciudad</label>
              <input
                type="text"
                value={form.ciudad}
                onChange={(e) => handleChange("ciudad", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="Ciudad de México"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-blossom-500">Estado</label>
              <input
                type="text"
                value={form.estado}
                onChange={(e) => handleChange("estado", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="Estado"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-blossom-500">País</label>
              <input
                type="text"
                value={form.pais}
                onChange={(e) => handleChange("pais", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="México"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-blossom-500">Dirección</label>
              <input
                type="text"
                value={form.direccion}
                onChange={(e) => handleChange("direccion", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="Av. Reforma 123"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-blossom-500">Teléfono</label>
              <input
                type="text"
                value={form.telefono}
                onChange={(e) => handleChange("telefono", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="+52 55 0000 0000"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-blossom-500">Horario / Notas</label>
            <textarea
              value={form.horario}
              onChange={(e) => handleChange("horario", e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm shadow-inner"
              placeholder="Lunes a sábado 6:00 - 16:00"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              disabled={saving}
              type="submit"
              className="rounded-full bg-gradient-to-r from-blossom-300 via-blossom-400 to-blossom-500 px-6 py-2 text-sm font-semibold text-white shadow-md disabled:opacity-60"
            >
              {editingId ? "Actualizar" : "Agregar sucursal"}
            </motion.button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-medium text-slate-500 underline"
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>

        <section className="rounded-3xl border border-blossom-100 bg-white/90 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">Mis sucursales</h2>
          {loading ? (
            <p className="mt-4 text-sm text-slate-500">Cargando...</p>
          ) : sucursales.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              Aún no tienes sucursales registradas.
            </p>
          ) : (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {sucursales.map((sucursal) => (
                <motion.article
                  key={sucursal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-slate-100 bg-white/70 p-4 shadow-inner"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-800">
                        {sucursal.nombre}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {sucursal.ciudad} {sucursal.estado && `• ${sucursal.estado}`}
                      </p>
                    </div>
                    <div className="space-x-2 text-sm">
                      <button
                        type="button"
                        onClick={() => handleEdit(sucursal)}
                        className="text-blossom-500 hover:underline"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(sucursal.id)}
                        className="text-red-500 hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  {sucursal.direccion && (
                    <p className="mt-2 text-sm text-slate-600">
                      {sucursal.direccion}
                    </p>
                  )}
                  {sucursal.telefono && (
                    <p className="text-xs text-slate-500">
                      Tel. {sucursal.telefono}
                    </p>
                  )}
                  {sucursal.horario && (
                    <p className="text-xs text-slate-500">
                      Horario: {sucursal.horario}
                    </p>
                  )}
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </motion.div>
    </div>
  );
}
