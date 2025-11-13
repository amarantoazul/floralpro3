"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, PlusCircle, X, Flower2 } from "lucide-react";

type Producto = {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen_url?: string;
  vendedor_id: string;
  tipo_vendedor: "proveedor" | "productor" | "agente";
  vendedores?: { nombre_comercial?: string };
};

type CarritoItem = {
  producto: Producto;
  cantidad: number;
};

export default function TiendaFloreriaPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState<string | null>(null);

  // 🔹 1. Cargar productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("/api/productos", { cache: "no-store" });
        if (!res.ok) throw new Error("No se pudieron cargar los productos");
        const data = await res.json();
        setProductos(data);
      } catch (err: any) {
        console.error(err.message);
        setMensaje("No se pudieron cargar los productos disponibles.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // 🔹 2. Agregar producto al carrito
  const addToCart = (producto: Producto) => {
    setCarrito((prev) => {
      const existente = prev.find((i) => i.producto.id === producto.id);
      if (existente) {
        return prev.map((i) =>
          i.producto.id === producto.id
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      } else {
        return [...prev, { producto, cantidad: 1 }];
      }
    });
  };

  // 🔹 3. Eliminar producto del carrito
  const removeFromCart = (id: string) => {
    setCarrito((prev) => prev.filter((i) => i.producto.id !== id));
  };

  // 🔹 4. Realizar pedido (POST /api/pedidos)
  const handlePedido = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    try {
      for (const item of carrito) {
        await fetch("/api/pedidos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            proveedor_id: item.producto.vendedor_id,
            total: item.producto.precio * item.cantidad,
            notas: `Pedido de ${item.cantidad} unidad(es) de ${item.producto.nombre}`,
          }),
        });
      }
      setCarrito([]);
      alert("✅ Pedido enviado correctamente.");
    } catch (err) {
      console.error(err);
      alert("❌ Error al enviar pedido.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blossom-50 via-white to-white px-4 py-10 text-slate-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-6xl"
      >
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-blossom-500 flex items-center gap-2">
              <Flower2 className="w-6 h-6" /> Tienda floral
            </h1>
            <p className="text-slate-600">
              Explora productos de productores, proveedores y agentes.
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handlePedido}
            disabled={carrito.length === 0}
            className="relative bg-blossom-400 hover:bg-blossom-500 text-white rounded-full px-6 py-3 font-semibold shadow-md disabled:opacity-60"
          >
            <ShoppingCart className="inline-block w-5 h-5 mr-2" />
            Realizar pedido ({carrito.length})
          </motion.button>
        </header>

        {/* Estado de carga o error */}
        {loading && (
          <p className="text-slate-500 text-sm">Cargando productos...</p>
        )}
        {mensaje && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {mensaje}
          </p>
        )}

        {/* Catálogo */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {!loading && productos.length > 0 ? (
            productos.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.02 }}
                className="rounded-3xl bg-white border border-blossom-100 shadow-sm overflow-hidden"
              >
                {p.imagen_url ? (
                  <img
                    src={p.imagen_url}
                    alt={p.nombre}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center bg-blossom-50 text-blossom-300 text-5xl">
                    🌺
                  </div>
                )}

                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {p.nombre}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {p.descripcion || "Sin descripción"}
                  </p>
                  <p className="text-sm text-slate-500">
                    Vendedor:{" "}
                    <span className="font-medium text-slate-700">
                      {p.vendedores?.nombre_comercial || p.tipo_vendedor}
                    </span>
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-blossom-500">
                      ${p.precio.toFixed(2)}
                    </p>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(p)}
                      className="flex items-center gap-1 rounded-full bg-blossom-400 hover:bg-blossom-500 text-white text-sm font-medium px-4 py-2"
                    >
                      <PlusCircle className="w-4 h-4" /> Agregar
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            !loading && (
              <p className="text-slate-500 text-sm col-span-full text-center">
                No hay productos disponibles en este momento.
              </p>
            )
          )}
        </div>

        {/* Carrito lateral */}
        <AnimatePresence>
          {carrito.length > 0 && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 right-6 bg-white border border-blossom-100 shadow-lg rounded-2xl p-4 w-80"
            >
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                🛒 Carrito de compra
              </h3>
              <div className="space-y-2 max-h-64 overflow-auto">
                {carrito.map((item) => (
                  <div
                    key={item.producto.id}
                    className="flex justify-between items-center text-sm border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.producto.nombre}</p>
                      <p className="text-xs text-slate-500">
                        {item.cantidad} × ${item.producto.precio.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.producto.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-3 border-t pt-3 flex justify-between items-center">
                <span className="font-semibold text-slate-700">
                  Total:
                </span>
                <span className="font-semibold text-blossom-500">
                  $
                  {carrito
                    .reduce(
                      (acc, i) => acc + i.producto.precio * i.cantidad,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
