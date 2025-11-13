import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

/**
 * 📦 GET /api/pedidos
 * Retorna los pedidos del usuario autenticado (florería),
 * incluyendo datos del proveedor o agente relacionados.
 */
export async function GET() {
  // 1️⃣ Verificar sesión
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = session.user.id;

  // 2️⃣ Obtener ID de la florería actual
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

  // 3️⃣ Consultar los pedidos realizados por esta florería
  const { data: pedidos, error } = await supabase
    .from("pedidos")
    .select(
      `
      id,
      comprador_id,
      proveedor_id,
      total,
      estado,
      notas,
      created_at,
      proveedores ( nombre_comercial )
    `
    )
    .eq("comprador_id", floreria.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(pedidos);
}

/**
 * 🧾 POST /api/pedidos
 * Crea un nuevo pedido de la florería actual hacia un proveedor/agente/productor.
 */
export async function POST(req: Request) {
  const body = await req.json();
  const { proveedor_id, total, notas } = body;

  if (!proveedor_id || !total) {
    return NextResponse.json(
      { error: "Proveedor y total son requeridos" },
      { status: 400 }
    );
  }

  // 1️⃣ Validar sesión
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = session.user.id;

  // 2️⃣ Buscar florería
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

  // 3️⃣ Crear pedido
  const { error } = await supabase.from("pedidos").insert([
    {
      comprador_id: floreria.id,
      proveedor_id,
      total,
      estado: "pendiente",
      notas,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/**
 * 🔄 PATCH /api/pedidos?id=<uuid>
 * Permite actualizar el estado o notas de un pedido específico.
 */
export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Falta el ID del pedido" }, { status: 400 });
  }

  const body = await req.json();
  const { estado, notas } = body;

  const { error } = await supabase
    .from("pedidos")
    .update({ estado, notas })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/**
 * 🗑 DELETE /api/pedidos?id=<uuid>
 * Elimina un pedido.
 */
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Falta el ID" }, { status: 400 });
  }

  const { error } = await supabase.from("pedidos").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
