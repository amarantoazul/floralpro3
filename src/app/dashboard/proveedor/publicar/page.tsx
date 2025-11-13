"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PublicarProductoPage() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState<number | string>("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [tipoVendedor] = useState("proveedor"); // 🔹 Por ahora se fija en proveedor

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!nombre.trim() || !precio) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio: Number(precio),
          imagen_url: imagenUrl,
          tipo_vendedor: tipoVendedor,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al crear producto");

      setSuccess(true);
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setImagenUrl("");
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blossom-50 via-white to-white py-10 px-4 text-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md border border-blossom-100 rounded-3xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center text-blossom-500 mb-2">
          Publicar nuevo producto
        </h1>
        <p className="text-center text-slate-600 mb-8 text-sm">
          Crea un producto para que las florerías puedan verlo y comprarlo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-blossom-500 mb-1">
              Nombre del producto
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full rounded-2xl border border-blossom-100 px-4 py-2 text-slate-700 focus:ring-2 focus:ring-blossom-300"
              placeholder="Ej. Rosa premium roja"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blossom-500 mb-1">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full rounded-2xl border border-blossom-100 px-4 py-2 text-slate-700 focus:ring-2 focus:ring-blossom-300"
              rows={3}
              placeholder="Detalles del producto, calidad, origen, etc."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-blossom-500 mb-1">
                Precio (USD)
              </label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="w-full rounded-2xl border border-blossom-100 px-4 py-2 text-slate-700 focus:ring-2 focus:ring-blossom-300"
                placeholder="Ej. 25.50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blossom-500 mb-1">
                Imagen (URL)
              </label>
              <input
                type="url"
                value={imagenUrl}
                onChange={(e) => setImagenUrl(e.target.value)}
                className="w-full rounded-2xl border border-blossom-100 px-4 py-2 text-slate-700 focus:ring-2 focus:ring-blossom-300"
                placeholder="https://..."
              />
            </div>
          </div>

          {imagenUrl && (
            <div className="flex justify-center mt-4">
              <Image
                src={imagenUrl}
                alt="Vista previa"
                width={160}
                height={160}
                className="rounded-2xl shadow-md border border-blossom-100"
              />
            </div>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm bg-red-50 text-red-500 py-2 px-3 rounded-xl"
            >
              {error}
            </motion.p>
          )}

          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm bg-green-50 text-green-600 py-2 px-3 rounded-xl"
            >
              ✅ Producto publicado correctamente
            </motion.p>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className="w-full bg-gradient-to-r from-blossom-300 to-blossom-500 text-white font-semibold py-3 rounded-full shadow-md hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Publicando..." : "Publicar producto"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
