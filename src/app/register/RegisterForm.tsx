// src/app/register/RegisterForm.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

type Role = "floreria" | "proveedor" | "productor" | "agente";

const DASHBOARD_BY_ROLE: Record<Role, `/dashboard/${Role}`> = {
  floreria: "/dashboard/floreria",
  proveedor: "/dashboard/proveedor",
  productor: "/dashboard/productor",
  agente: "/dashboard/agente",
};

const isEmail = (v: string) => /[^@\s]+@[^@\s]+\.[^@\s]+/.test(v);
const min = (n: number) => (v: string) => v.trim().length >= n;

function SuccessIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 15-5-5 1.414-1.414L11 13.172l6.586-6.586L19 8Z"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z"
      />
    </svg>
  );
}

type Props = { initialRole: string | null };

export default function RegisterForm({ initialRole }: Props) {
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(
    initialRole as Role | null
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!role && typeof document !== "undefined") {
      const m = document.cookie.match(/(?:^|; )fp-role-temp=([^;]+)/);
      if (m) setRole(decodeURIComponent(m[1]) as Role);
    }
  }, [role]);

  const validate = () => {
    if (!role) return "Selecciona un rol";
    if (!isEmail(email)) return "Correo inválido";
    if (!min(3)(name)) return "Nombre demasiado corto";
    if (!min(8)(password))
      return "La contraseña debe tener al menos 8 caracteres";
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({ email, password });
      if (signUpError) throw signUpError;
      const user = signUpData.user;
      if (!user) throw new Error("No se pudo crear el usuario");

      const { error: insertError } = await supabase.from("usuarios").insert({
        id: user.id,
        nombre: name,
        email,
        rol: role,
      });
      if (insertError) throw insertError;

      document.cookie =
        "fp-role-temp=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
      setNotice("¡Registro completado! Redirigiendo…");
      const r = role as Role;
      router.replace(DASHBOARD_BY_ROLE[r]);
    } catch (err: any) {
      setError(err?.message || "Error inesperado al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white/70 backdrop-blur shadow-xl p-6 border border-rose-100">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-rose-700">
            Crear tu cuenta
          </h1>
          <p className="text-sm text-rose-500 mt-1">
            Completa los campos para comenzar
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-rose-700 mb-1">
            Rol
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(["proveedor", "floreria", "productor", "agente"] as const).map(
              (r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`px-3 py-2 rounded-xl border text-sm transition ${
                    role === r
                      ? "bg-rose-600 text-white border-rose-600"
                      : "bg-white hover:bg-rose-50 border-rose-200 text-rose-700"
                  }`}
                >
                  {r}
                </button>
              )
            )}
          </div>
          {!initialRole && (
            <p className="text-xs text-rose-400 mt-2">
              Si no ves tu rol, regresa a la{" "}
              <Link className="underline" href="/seleccion-rol">
                selección de rol
              </Link>
              .
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-rose-700 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-rose-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rose-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-rose-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-rose-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-rose-200 px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
              minLength={8}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-rose-600 text-white py-2 font-medium shadow hover:bg-rose-700 transition disabled:opacity-60"
          >
            {loading ? "Creando cuenta…" : "Crear cuenta"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-rose-500">
          ¿Ya tienes cuenta?{" "}
          <Link className="underline" href="/login">
            Inicia sesión
          </Link>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-rose-700"
              role="alert"
            >
              <ErrorIcon />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {notice && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-700"
              role="status"
            >
              <SuccessIcon />
              <span className="text-sm">{notice}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
