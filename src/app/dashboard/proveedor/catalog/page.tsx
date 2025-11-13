"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion } from "framer-motion";

interface Producto {
  id?: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock?: number | null;
  imagen_url?: string;
  created_at?: string;
}

const initialProducto: Producto = {
  nombre: "",
  descripcion: "",
  precio: 0,
  stock: null,
  imagen_url: "",
};

export default function ProveedorCatalogoPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [form, setForm] = useState<Producto>(initialProducto);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/proveedor/catalogo", { cache: "no-store" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "No se pudieron cargar los productos");
      }
      const data = await res.json();
      setProductos(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProductos();
  }, []);

  const handleChange = (field: keyof Producto, value: string) => {
    if (field === "precio") {
      setForm((prev) => ({ ...prev, precio: Number(value) }));
      return;
    }
    if (field === "stock") {
      setForm((prev) => ({ ...prev, stock: value ? Number(value) : null }));
      return;
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(initialProducto);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.precio) {
      setError("Nombre y precio son obligatorios");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const res = await fetch("/api/proveedor/catalogo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo crear el producto");
      resetForm();
      await fetchProductos();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleActualizar = async (producto: Producto) => {
    if (!producto.id) return;
    try {
      const res = await fetch("/api/proveedor/catalogo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: producto.id,
          precio: producto.precio,
          stock: producto.stock,
          descripcion: producto.descripcion,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo actualizar");
      await fetchProductos();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const confirmDelete = window.confirm("¿Eliminar producto?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/proveedor/catalogo?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo eliminar");
      await fetchProductos();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blossom-50/40 to-white px-4 py-10 text-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-6xl space-y-8"
      >
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blossom-300">
            Catálogo
          </p>
          <h1 className="text-3xl font-semibold text-blossom-500">
            Publica y actualiza tu oferta
          </h1>
          <p className="text-sm text-slate-500">
            Las florerías compran directamente los productos que publiques aquí.
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
                placeholder="Rosa premium blanca"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-blossom-500">Precio (USD)</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={form.precio}
                onChange={(e) => handleChange("precio", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="18.50"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-blossom-500">Stock disponible</label>
              <input
                type="number"
                min={0}
                value={form.stock ?? ""}
                onChange={(e) => handleChange("stock", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-blossom-500">Imagen (URL)</label>
              <input
                type="url"
                value={form.imagen_url}
                onChange={(e) => handleChange("imagen_url", e.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm shadow-inner"
                placeholder="https://"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-blossom-500">Descripción</label>
            <textarea
              value={form.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm shadow-inner"
              placeholder="Información relevante del producto, calibre, certificaciones, etc."
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={saving}
            type="submit"
            className="mt-6 rounded-full bg-gradient-to-r from-blossom-300 via-blossom-400 to-blossom-500 px-6 py-3 text-sm font-semibold text-white shadow-md disabled:opacity-60"
          >
            {saving ? "Publicando..." : "Publicar producto"}
          </motion.button>
        </form>

        <section className="rounded-3xl border border-blossom-100 bg-white/90 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">Productos publicados</h2>
          {loading ? (
            <p className="mt-4 text-sm text-slate-500">Cargando...</p>
          ) : productos.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">Aún no tienes productos publicados.</p>
          ) : (
            <div className="mt-4 space-y-4">
              {productos.map((producto) => (
                <motion.div
                  key={producto.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-slate-100 bg-white/70 p-4 shadow-inner"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-slate-800">
                        {producto.nombre}
                      </p>
                      <p className="text-xs text-slate-500">
                        Publicado el {" "}
                        {producto.created_at
                          ? new Date(producto.created_at).toLocaleDateString("es-MX")
                          : "--"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(producto.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <label className="text-sm text-slate-500">
                      Precio
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        value={producto.precio}
                        onChange={(e) =>
                          setProductos((prev) =>
                            prev.map((p) =>
                              p.id === producto.id
                                ? { ...p, precio: Number(e.target.value) }
                                : p
                            )
                          )
                        }
                        className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="text-sm text-slate-500">
                      Stock
                      <input
                        type="number"
                        min={0}
                        value={producto.stock ?? ""}
                        onChange={(e) =>
                          setProductos((prev) =>
                            prev.map((p) =>
                              p.id === producto.id
                                ? { ...p, stock: e.target.value ? Number(e.target.value) : null }
                                : p
                            )
                          )
                        }
                        className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="text-sm text-slate-500">
                      Descripción corta
                      <input
                        type="text"
                        value={producto.descripcion ?? ""}
                        onChange={(e) =>
                          setProductos((prev) =>
                            prev.map((p) =>
                              p.id === producto.id
                                ? { ...p, descripcion: e.target.value }
                                : p
                            )
                          )
                        }
                        className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
                      />
                    </label>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleActualizar(producto)}
                      className="rounded-full bg-blossom-500 px-4 py-2 font-semibold text-white shadow"
                    >
                      Guardar cambios
                    </motion.button>
                    {producto.imagen_url && (
                      <a
                        href={producto.imagen_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 underline"
                      >
                        Ver imagen
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </motion.div>
    </div>
  );
}