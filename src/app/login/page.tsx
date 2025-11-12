"use client";

import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const ROLE_DASHBOARD: Record<string, string> = {
  proveedor: "/dashboard/proveedor",
  floreria: "/dashboard/floreria",
  productor: "/dashboard/productor",
  agente: "/dashboard/agente",
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Verifica si ya existe una sesión activa
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const roleCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("fp-role="))
        ?.split("=")[1];

      const role =
        roleCookie || (data.session?.user.user_metadata?.role as string | undefined);

      if (role) {
        router.replace((ROLE_DASHBOARD[role] ?? "/dashboard/floreria") as any);
      }
    };
    void checkSession();
  }, [router]);

  // Envío del formulario
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Por favor, ingresa tu correo y contraseña.");
      setLoading(false);
      return;
    }

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError || !data.user) {
      setError(signInError?.message ?? "Error al iniciar sesión.");
      setLoading(false);
      return;
    }

    // Consultar el rol del usuario
    const { data: roleData, error: roleError } = await supabase
      .from("usuarios")
      .select("rol")
      .eq("id", data.user.id)
      .maybeSingle();

    if (roleError || !roleData?.rol) {
      setError("No se pudo obtener el rol del usuario. Inténtalo nuevamente.");
      setLoading(false);
      return;
    }

    const role = roleData.rol;
    document.cookie = `fp-role=${role}; path=/;`;

    router.push((ROLE_DASHBOARD[role] ?? "/dashboard/floreria") as any);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blossom-100 via-white to-white px-4 py-10 text-slate-800">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900">
            Bienvenido de vuelta
          </h1>
          <p className="text-sm text-slate-600">
            Inicia sesión para continuar con tu experiencia floral.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-3xl bg-white/80 p-8 shadow-lg backdrop-blur"
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-blossom-500"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-blossom-300 focus:outline-none focus:ring-2 focus:ring-blossom-200"
              placeholder="tu@email.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-blossom-500"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-blossom-300 focus:outline-none focus:ring-2 focus:ring-blossom-200"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <motion.p
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-blossom-200 bg-blossom-50/90 px-4 py-3 text-sm font-medium text-blossom-500"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-blossom-300 via-blossom-400 to-blossom-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blossom-200 transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Iniciando sesión..." : "Ingresar"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="font-semibold text-blossom-500 hover:text-blossom-600"
          >
            Regístrate aquí
          </Link>
        </p>
      </motion.main>
    </div>
  );
}
