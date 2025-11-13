"use server";

import { getSupabaseServerClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * 🔐 Iniciar sesión
 * @param formData - datos enviados desde el formulario (email, password)
 */
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Error al iniciar sesión:", error.message);
    return { error: error.message };
  }

  revalidatePath("/dashboard", "layout");
redirect("/dashboard" as any);

}

/**
 * 🚪 Cerrar sesión
 */
export async function logoutAction() {
  const supabase = getSupabaseServerClient();
  await supabase.auth.signOut();

  revalidatePath("/");
  redirect("/login");
}

/**
 * 👤 Obtener perfil del usuario autenticado
 */
export async function getUserProfile() {
  const supabase = getSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("usuarios")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error cargando perfil:", profileError.message);
    return null;
  }

  return profile;
}

/**
 * 🧑‍💼 Actualizar perfil del usuario
 */
export async function updateUserProfile(updates: Record<string, any>) {
  const supabase = getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "No autenticado" };

  const { error } = await supabase
    .from("usuarios")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    console.error("Error al actualizar perfil:", error.message);
    return { error: error.message };
  }

  revalidatePath("/dashboard/perfil");
  return { success: true };
}
