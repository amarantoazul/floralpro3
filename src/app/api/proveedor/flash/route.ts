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

export async function GET() {
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

  const { data, error } = await supabase
    .from("flash")
    .select(
      "id, descripcion, cantidad, fecha_entrega, estado, created_at, cotizacion, floreria_id"
    )
    .eq("proveedor_id", result.data.id)
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data ?? []);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, estado, cotizacion } = body;

  if (!id)
    return NextResponse.json({ error: "Falta el ID" }, { status: 400 });

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
    .from("flash")
    .update({ estado, cotizacion })
    .eq("id", id)
    .eq("proveedor_id", result.data.id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
