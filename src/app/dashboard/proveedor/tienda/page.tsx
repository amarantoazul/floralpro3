"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flower2, RefreshCcw } from "lucide-react";

type Producto = {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen_url?: string;
  tipo_vendedor: string;
  vendedor_id: string;
  vendedor_nombre?: string;
};

type Perfil = {
  id?: string;
};

export default function ProveedorTiendaPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [perfil, setPerfil] = useState<Perfil>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [productosRes, perfilRes] = await Promise.all([
        fetch("/api/productos", { cache: "no-store" }),
        fetch("/api/proveedor/perfil", { cache: "no-store" }),
      ]);

      if (!productosRes.ok) {
        const data = await productosRes.json();
        throw new Error(data.error || "No se pudieron cargar los productos");
      }

      if (!perfilRes.ok) {
        const data = await perfilRes.json();
        throw new Error(data.error || "No se pudo cargar el perfil");
      }

      const productosData = await productosRes.json();
      const perfilData = await perfilRes.json();

      setPerfil(perfilData);
      setProductos(productosData);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const productosVisibles = productos.filter((producto) => {
    if (!perfil?.id) return true;
    return !(
      producto.tipo_vendedor === "proveedor" &&
      producto.vendedor_id === perfil.id
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blossom-50/30 to-white px-4 py-10 text-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-6xl space-y-8"
      >
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blossom-300">
              Tienda colaborativa
            </p>
            <h1 className="flex items-center gap-2 text-3xl font-semibold text-blossom-500">
              <Flower2 className="h-7 w-7" /> Explora otras ofertas
            </h1>
            <p className="text-sm text-slate-500">
              Descubre productos de productores y agentes para complementar tus pedidos.
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={fetchData}
            className="flex items-center gap-2 rounded-full border border-blossom-200 px-5 py-2 text-sm font-semibold text-blossom-500"
          >
            <RefreshCcw size={16} /> Actualizar
          </motion.button>
        </header>

        {error && (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-500">
            {error}
          </p>
        )}

        {loading ? (
          <p className="text-sm text-slate-500">Cargando productos...</p>
        ) : productosVisibles.length === 0 ? (
          <p className="text-sm text-slate-500">
            No hay productos disponibles por ahora.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productosVisibles.map((producto) => (
              <motion.article
                key={producto.id}
                whileHover={{ translateY: -4 }}
                className="overflow-hidden rounded-3xl border border-blossom-100 bg-white shadow-sm"
              >
                {producto.imagen_url ? (
                  <img
                    src={producto.imagen_url}
                    alt={producto.nombre}
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-44 items-center justify-center bg-blossom-50 text-5xl">
                    🌷
                  </div>
                )}
                <div className="space-y-2 p-5">
                  <p className="text-xs uppercase tracking-wide text-blossom-300">
                    {producto.tipo_vendedor}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {producto.nombre}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {producto.descripcion || "Sin descripción"}
                  </p>
                  <p className="text-sm text-slate-400">
                    Vendedor: {producto.vendedor_nombre || producto.tipo_vendedor}
                  </p>
                  <p className="text-xl font-semibold text-blossom-500">
                    ${producto.precio?.toFixed?.(2) ?? "0.00"}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
