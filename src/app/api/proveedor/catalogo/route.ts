import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

async function getProveedor(userId: string) {
  const { data, error } = await supabase
    .from("proveedores")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    return { error } as const;
  }

  return { data } as const;
}

export async function GET(request: Request) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const result = await getProveedor(session.user.id);
  if ("error" in result) {
    return NextResponse.json(
      { error: "No se encontró el proveedor" },
      { status: 404 }
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || undefined;

  const query = supabase
    .from("productos")
    .select("id, nombre, descripcion, precio, stock, imagen_url, created_at")
    .eq("tipo_vendedor", "proveedor")
    .eq("vendedor_id", result.data.id)
    .order("created_at", { ascending: false });

  if (limit) {
    query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { nombre, descripcion, precio, imagen_url, stock } = body;

  if (!nombre || typeof precio !== "number") {
    return NextResponse.json(
      { error: "Nombre y precio son obligatorios" },
      { status: 400 }
    );
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const result = await getProveedor(session.user.id);
  if ("error" in result) {
    return NextResponse.json(
      { error: "No se encontró el proveedor" },
      { status: 404 }
    );
  }

  const { error } = await supabase.from("productos").insert({
    nombre,
    descripcion,
    precio,
    imagen_url,
    stock,
    tipo_vendedor: "proveedor",
    vendedor_id: result.data.id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { id, ...fields } = body;

  if (!id) {
    return NextResponse.json({ error: "Falta el ID" }, { status: 400 });
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const result = await getProveedor(session.user.id);
  if ("error" in result) {
    return NextResponse.json(
      { error: "No se encontró el proveedor" },
      { status: 404 }
    );
  }

  const { error } = await supabase
    .from("productos")
    .update(fields)
    .eq("id", id)
    .eq("tipo_vendedor", "proveedor")
    .eq("vendedor_id", result.data.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Falta el ID" }, { status: 400 });
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const result = await getProveedor(session.user.id);
  if ("error" in result) {
    return NextResponse.json(
      { error: "No se encontró el proveedor" },
      { status: 404 }
    );
  }

  const { error } = await supabase
    .from("productos")
    .delete()
    .eq("id", id)
    .eq("vendedor_id", result.data.id)
    .eq("tipo_vendedor", "proveedor");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}