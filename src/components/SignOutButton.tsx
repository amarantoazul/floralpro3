"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      className="rounded-full border border-blossom-200 px-4 py-2 text-xs font-semibold text-blossom-400 transition hover:border-blossom-300 hover:text-blossom-500"
      type="button"
    >
      Cerrar sesión
    </button>
  );
}