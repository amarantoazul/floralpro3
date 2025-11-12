"use client";

import { useState, useEffect, useMemo, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const FALLBACK_ROLE = "floreria";

function extractRoleFromCookies(): string | null {
  if (typeof document === "undefined") return null;
  const cookieValue = document.cookie
    .split("; ")
    .find((item) => item.startsWith("fp-role="))
    ?.split("=")[1];
  return cookieValue ? decodeURIComponent(cookieValue) : null;
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(FALLBACK_ROLE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Detectar rol desde cookies
  useEffect(() => {
    const detected = extractRoleFromCookies();
    if (detected) setRole(detected);
  }, []);

  const isFormValid = useMemo(
    () => name && email && password && confirmPassword,
    [name, email, password, confirmPassword]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isFormValid) {
      setError("Por favor completa todos los campos.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    // Crear usuario en Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, role } },
    });

    if (signUpError) {
      setError(signUpError.message ?? "No fue posible crear la cuenta.");
      setLoading(false);
      return;
    }

    const userId = data.user?.id;
    if (!userId) {
      setError("No pudimos obtener la información del usuario.");
      setLoading(false);
      return;
    }

    // Guardar datos adicionales en la tabla usuarios
    const timestamp = new Date().toISOString();
    const { error: insertError } = await supabase.from("usuarios").insert({
      id: userId,
      nombre: name,
      rol: role,
      created_at: timestamp,
      updated_at: timestamp,
    });

    if (insertError) {
      setError(insertError.message ?? "Ocurrió un error al guardar tus datos.");
      setLoading(false);
      return;
    }

    setSuccess("Cuenta creada exitosamente. Redirigiendo...");
    setLoading(false);

    // Redirigir al dashboard correspondiente
    router.push(`/dashboard/${role}` as any);


  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blossom-50 via-white to-blossom-100 px-4 py-10">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex w-full max-w-md flex-col gap-8"
      >
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-semibold text-blossom-500">
            Crea tu cuenta
          </h1>
          <p className="text-sm text-blossom-400/80">
            Regístrate para comenzar a gestionar tu operación floral desde
            cualquier dispositivo.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white/80 p-6 shadow-xl backdrop-blur"
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blossom-500">
                Nombre completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-white/80 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:ring-2 focus:ring-blossom-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blossom-500">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/80 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:ring-2 focus:ring-blossom-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blossom-500">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/80 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:ring-2 focus:ring-blossom-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blossom-500">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/80 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:ring-2 focus:ring-blossom-200"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-2xl bg-blossom-50 px-4 py-3 text-sm text-blossom-500 shadow-inner">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 rounded-2xl bg-white/70 px-4 py-3 text-sm text-blossom-400 shadow-inner">
              {success}
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-blossom-200 via-blossom-300 to-blossom-400 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creando cuenta..." : "Registrarme"}
          </motion.button>

          <p className="mt-4 text-center text-sm text-blossom-400/80">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-semibold text-blossom-500 hover:text-blossom-400"
            >
              Inicia sesión
            </Link>
          </p>
        </form>
      </motion.main>
    </div>
  );
}
