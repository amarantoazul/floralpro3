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
    .from("sucursales")
    .select("id, nombre, direccion, ciudad, estado, pais, telefono, horario, latitud, longitud, created_at")
    .eq("proveedor_id", result.data.id)
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { nombre, direccion, ciudad, estado, pais, telefono, horario, latitud, longitud } = body;

  if (!nombre || !ciudad)
    return NextResponse.json(
      { error: "Nombre y ciudad son requeridos" },
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

  const { error } = await supabase.from("sucursales").insert({
    proveedor_id: result.data.id,
    nombre,
    direccion,
    ciudad,
    estado,
    pais,
    telefono,
    horario,
    latitud,
    longitud,
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, ...fields } = body;

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
    .from("sucursales")
    .update(fields)
    .eq("id", id)
    .eq("proveedor_id", result.data.id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

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
    .from("sucursales")
    .delete()
    .eq("id", id)
    .eq("proveedor_id", result.data.id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
