"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SeleccionRolPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const roles = [
    {
      id: "proveedor",
      nombre: "Proveedor",
      descripcion: "Centraliza inventarios, catálogos y disponibilidad en tiempo real.",
      emoji: "🚚",
    },
    {
      id: "floreria",
      nombre: "Florería",
      descripcion: "Gestiona pedidos, entregas y productos estrella fácilmente.",
      emoji: "🌸",
    },
    {
      id: "productor",
      nombre: "Productor",
      descripcion: "Conecta tu producción con la demanda y anticipa necesidades.",
      emoji: "🌿",
    },
    {
      id: "agente",
      nombre: "Agente",
      descripcion: "Coordina contratos y logística con tu red de aliados.",
      emoji: "🤝",
    },
  ];

  const handleSelect = (rol: string) => {
    setSelected(rol);

    // Guardar cookie temporal
    document.cookie = `fp-role-temp=${rol}; path=/; max-age=3600`;

    // Pequeño delay para animación
    setTimeout(() => {
      router.push("/register");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 via-white to-white text-slate-800 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-blossom-500 mb-2">
          Selecciona tu rol 🌺
        </h1>
        <p className="text-slate-600 mb-8">
          Elige el rol que mejor describe tu función en la cadena floral.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {roles.map((rol) => (
            <motion.button
              key={rol.id}
              onClick={() => handleSelect(rol.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`rounded-2xl border-2 p-6 text-left transition-all shadow-sm ${
                selected === rol.id
                  ? "border-blossom-400 bg-blossom-50 shadow-md"
                  : "border-transparent hover:border-blossom-200 hover:bg-blossom-50/40"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{rol.emoji}</span>
                <h2 className="text-xl font-semibold text-slate-800">
                  {rol.nombre}
                </h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {rol.descripcion}
              </p>
            </motion.button>
          ))}
        </div>

        {selected && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-sm text-blossom-400 font-medium"
          >
            Redirigiendo a registro como <span className="capitalize">{selected}</span>...
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
