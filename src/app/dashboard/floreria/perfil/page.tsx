"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

type Perfil = {
  id: string;
  nombre: string;
  telefono: string;
  direccion: string;
  pais: string;
  logo_url?: string;
};

export default function PerfilFloreriaPage() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [pais, setPais] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar el perfil actual de la florería
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        setFetching(true);
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const user = session?.user;
        if (!user) throw new Error("Usuario no autenticado.");

        const { data, error: perfilError } = await supabase
          .from("florerias")
          .select("*")
          .eq("usuario_id", user.id)
          .single();

        if (perfilError && perfilError.code !== "PGRST116") throw perfilError;

        if (data) {
          setPerfil(data);
          setNombre(data.nombre);
          setTelefono(data.telefono || "");
          setDireccion(data.direccion || "");
          setPais(data.pais || "");
        }
      } catch (err: any) {
        console.error("Error cargando perfil:", err.message);
        setError("No se pudo cargar el perfil.");
      } finally {
        setFetching(false);
      }
    };

    void fetchPerfil();
  }, []);

  // Manejar envío del formulario
  const handleGuardar = async (e: FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }

    try {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) throw new Error("Usuario no autenticado.");

      let logoUrl = perfil?.logo_url;

      // Si se cargó una nueva imagen
      if (logo) {
        const fileExt = logo.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("logos")
          .upload(fileName, logo, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrl } = supabase.storage
          .from("logos")
          .getPublicUrl(uploadData.path);
        logoUrl = publicUrl.publicUrl;
      }

      // Insertar o actualizar
      const { error: upsertError } = await supabase.from("florerias").upsert(
        {
          usuario_id: user.id,
          nombre,
          telefono,
          direccion,
          pais,
          logo_url: logoUrl,
        },
        { onConflict: "usuario_id" }
      );

      if (upsertError) throw upsertError;
      alert("✅ Perfil guardado correctamente.");
    } catch (err: any) {
      console.error("Error guardando perfil:", err.message);
      setError("No se pudo guardar el perfil.");
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
          Perfil de la Florería 🌸
        </h1>
        <p className="text-slate-600">
          Administra tu información general, contacto y logotipo.
        </p>
      </header>

      {fetching ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="h-10 w-10 rounded-full border-4 border-blossom-300 border-t-transparent"
          />
        </div>
      ) : (
        <motion.form
          onSubmit={handleGuardar}
          className="rounded-3xl bg-white shadow-md border border-blossom-100 p-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Imagen o logotipo */}
          <div className="flex items-center gap-4">
            {perfil?.logo_url ? (
              <img
                src={perfil.logo_url}
                alt="Logo florería"
                className="h-20 w-20 rounded-full object-cover border border-blossom-200"
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-blossom-100 flex items-center justify-center text-blossom-400 text-2xl">
                🌼
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-blossom-500">
                Logo o imagen
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setLogo(e.target.files?.[0] || null)}
                className="mt-1 text-sm text-slate-600"
              />
            </div>
          </div>

          {/* Información */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blossom-500">
                Nombre comercial
              </label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-inner focus:border-blossom-300 focus:ring-2 focus:ring-blossom-200"
                placeholder="Ejemplo: Flor del Valle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blossom-500">
                Teléfono
              </label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-inner focus:border-blossom-300 focus:ring-2 focus:ring-blossom-200"
                placeholder="+52 55 1234 5678"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blossom-500">
                Dirección
              </label>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-inner focus:border-blossom-300 focus:ring-2 focus:ring-blossom-200"
                placeholder="Ejemplo: Calle de las Rosas 123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blossom-500">
                País
              </label>
              <input
                type="text"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-inner focus:border-blossom-300 focus:ring-2 focus:ring-blossom-200"
                placeholder="México"
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
            {loading ? "Guardando..." : "Guardar cambios"}
          </motion.button>
        </motion.form>
      )}
    </motion.div>
  );
}
