import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

async function getProveedor(userId: string) {
  const { data, error } = await supabase
    .from("proveedores")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (error || !data) return { error };
  return { data };
}

export async function GET(request: Request) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user)
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const result = await getProveedor(session.user.id);
  if ("error" in result)
    return NextResponse.json(
      { error: "Proveedor no encontrado" },
      { status: 404 }
    );

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || undefined;

  const query = supabase
    .from("pedidos")
    .select(
      "id, comprador_id, total, estado, notas, created_at, fecha_entrega, tipo_entrega, sucursal_origen, sucursal_destino"
    )
    .eq("proveedor_id", result.data.id)
    .order("created_at", { ascending: false });

  if (limit) query.limit(limit);

  const { data, error } = await query;

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data ?? []);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, estado, notas } = body;

  if (!id)
    return NextResponse.json({ error: "Falta el ID" }, { status: 400 });

  if (!estado && !notas)
    return NextResponse.json(
      { error: "Debe enviarse un estado o notas" },
      { status: 400 }
    );

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user)
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const result = await getProveedor(session.user.id);
  if ("error" in result)
    return NextResponse.json(
      { error: "Proveedor no encontrado" },
      { status: 404 }
    );

  const { error } = await supabase
    .from("pedidos")
    .update({ estado, notas })
    .eq("id", id)
    .eq("proveedor_id", result.data.id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
