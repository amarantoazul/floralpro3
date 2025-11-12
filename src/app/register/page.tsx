"use client";

import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const DEFAULT_ROLE = "floreria";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role: DEFAULT_ROLE
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const sessionResponse = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: DEFAULT_ROLE })
    });

    if (!sessionResponse.ok) {
      setError("No se pudo crear la sesión, intenta nuevamente.");
      setLoading(false);
      return;
    }

    const hasSession = Boolean(data.session);
    if (hasSession) {
      router.push(`/dashboard/${DEFAULT_ROLE}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container flex flex-1 flex-col justify-center gap-8 py-10"
      >
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-semibold">Crea tu cuenta</h1>
          <p>Comienza a gestionar tu operación floral desde cualquier dispositivo.</p>
        </div>
        <form onSubmit={handleSubmit} className="floating-card space-y-6 p-6">
          <div className="space-y-2 text-left">
            <label htmlFor="name" className="text-sm font-medium text-slate-700">
              Nombre completo
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-white/80 bg-white/60 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-white/40 focus:border-blossom-300 focus:outline-none focus:ring-2 focus:ring-blossom-200"
            />
          </div>
          <div className="space-y-2 text-left">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/80 bg-white/60 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-white/40 focus:border-blossom-300 focus:outline-none focus:ring-2 focus:ring-blossom-200"
            />
          </div>
          <div className="space-y-2 text-left">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/80 bg-white/60 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-white/40 focus:border-blossom-300 focus:outline-none focus:ring-2 focus:ring-blossom-200"
            />
          </div>
          {error ? (
            <p className="rounded-2xl bg-blossom-50/90 px-4 py-3 text-sm font-medium text-blossom-500">
              {error}
            </p>
          ) : null}
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-blossom-200 via-blossom-300 to-blossom-400 px-6 py-3 text-base font-semibold text-white shadow-soft transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creando cuenta..." : "Registrarme"}
          </motion.button>
        </form>
        <p className="text-center text-sm text-slate-600">
          ¿Ya tienes cuenta? {" "}
          <Link href="/login" className="font-semibold text-blossom-400 hover:text-blossom-500">
            Inicia sesión
          </Link>
        </p>
      </motion.main>
    </div>
  );
}