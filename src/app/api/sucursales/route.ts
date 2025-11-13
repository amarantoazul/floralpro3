import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

/**
 * 📦 GET /api/sucursales
 * Obtiene todas las sucursales de la florería autenticada.
 */
export async function GET() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = session.user.id;

  // Buscar la florería asociada al usuario
  const { data: floreria, error: florError } = await supabase
    .from("florerias")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (florError || !floreria) {
    return NextResponse.json(
      { error: "No se encontró la florería del usuario" },
      { status: 404 }
    );
  }

  const { data, error } = await supabase
    .from("sucursales_floreria")
    .select("*")
    .eq("floreria_id", floreria.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

/**
 * 🧾 POST /api/sucursales
 * Crea una nueva sucursal asociada a la florería actual.
 */
export async function POST(req: Request) {
  const body = await req.json();
  const {
    nombre,
    direccion,
    ciudad,
    estado,
    pais,
    telefono,
  } = body;

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = session.user.id;

  const { data: floreria, error: florError } = await supabase
    .from("florerias")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (florError || !floreria) {
    return NextResponse.json(
      { error: "No se encontró la florería del usuario" },
      { status: 404 }
    );
  }

  const { error } = await supabase.from("sucursales_floreria").insert([
    {
      floreria_id: floreria.id,
      nombre,
      direccion,
      ciudad,
      estado,
      pais,
      telefono,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/**
 * 🗑 DELETE /api/sucursales?id=<uuid>
 * Elimina una sucursal específica.
 */
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Falta el ID" }, { status: 400 });
  }

  const { error } = await supabase
    .from("sucursales_floreria")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
