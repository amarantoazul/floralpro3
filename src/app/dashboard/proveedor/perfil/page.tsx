"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion } from "framer-motion";

const emptyPerfil = {
  nombre_comercial: "",
  descripcion: "",
  telefono: "",
  email_contacto: "",
  logo_url: "",
  website: "",
  instagram: "",
  facebook: "",
};

type Perfil = typeof emptyPerfil;

export default function ProveedorPerfilPage() {
  const [perfil, setPerfil] = useState<Perfil>(emptyPerfil);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/proveedor/perfil", { cache: "no-store" });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "No se pudo cargar el perfil");
        }
        const data = await res.json();
        setPerfil({ ...emptyPerfil, ...data });
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    void fetchPerfil();
  }, []);

  const handleChange = (field: keyof Perfil, value: string) => {
    setPerfil((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    if (!perfil.nombre_comercial.trim()) {
      setError("El nombre comercial es obligatorio");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/proveedor/perfil", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(perfil),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo guardar");

      setMessage("Perfil actualizado correctamente.");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blossom-50 via-white to-white px-4 py-10 text-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-4xl space-y-8"
      >
        {/* Header */}
        <header className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blossom-300">
            Perfil del proveedor
          </p>
          <h1 className="text-3xl font-semibold text-blossom-500">
            Ajusta tus datos públicos
          </h1>
          <p className="text-sm text-slate-500">
            La información se muestra a florerías, agentes y productores en la tienda.
          </p>
        </header>

        {/* Mensajes */}
        {error && (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-500 text-center">
            {error}
          </p>
        )}
        {message && (
          <p className="rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-600 text-center">
            {message}
          </p>
        )}

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-blossom-100 bg-white/80 p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-blossom-500">
                Nombre comercial
              </label>
              <input
                type="text"
                value={perfil.nombre_comercial}
                onChange={(e) => handleChange("nombre_comercial", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="Ej. Flores del Valle"
                disabled={loading}
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-blossom-500">
                Teléfono
              </label>
              <input
                type="tel"
                value={perfil.telefono}
                onChange={(e) => handleChange("telefono", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="+52 55 0000 0000"
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-blossom-500">
                Correo
              </label>
              <input
                type="email"
                value={perfil.email_contacto}
                onChange={(e) => handleChange("email_contacto", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="ventas@floralpro.mx"
                disabled={loading}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-blossom-500">
                Sitio web
              </label>
              <input
                type="url"
                value={perfil.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="https://"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-blossom-500">
              Descripción
            </label>
            <textarea
              value={perfil.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm shadow-inner"
              placeholder="Cuenta tu historia, certificaciones o capacidades logísticas"
              disabled={loading}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-sm font-semibold text-blossom-500">
                Logo (URL)
              </label>
              <input
                type="url"
                value={perfil.logo_url}
                onChange={(e) => handleChange("logo_url", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="https://"
                disabled={loading}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-blossom-500">
                Instagram
              </label>
              <input
                type="text"
                value={perfil.instagram}
                onChange={(e) => handleChange("instagram", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="@floralpro"
                disabled={loading}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-blossom-500">
                Facebook
              </label>
              <input
                type="text"
                value={perfil.facebook}
                onChange={(e) => handleChange("facebook", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="/floralpro"
                disabled={loading}
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={saving || loading}
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-blossom-300 via-blossom-400 to-blossom-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition disabled:opacity-60"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
