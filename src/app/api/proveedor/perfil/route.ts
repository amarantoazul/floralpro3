import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

const PERFIL_FIELDS =
  "id, nombre_comercial, descripcion, telefono, email_contacto, logo_url, website, instagram, facebook, whatsapp, contacto_principal";

async function getProveedorPerfil(userId: string) {
  const { data, error } = await supabase
    .from("proveedores")
    .select(PERFIL_FIELDS)
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

  const result = await getProveedorPerfil(session.user.id);
  if ("error" in result)
    return NextResponse.json(
      { error: "No se encontró el perfil del proveedor" },
      { status: 404 }
    );

  return NextResponse.json(result.data);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const {
    nombre_comercial,
    descripcion,
    telefono,
    email_contacto,
    logo_url,
    website,
    instagram,
    facebook,
    whatsapp,
    contacto_principal,
  } = body;

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user)
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { data: proveedor, error } = await supabase
    .from("proveedores")
    .select("id")
    .eq("user_id", session.user.id)
    .single();

  if (error || !proveedor)
    return NextResponse.json(
      { error: "No se encontró el perfil del proveedor" },
      { status: 404 }
    );

  const { error: updateError } = await supabase
    .from("proveedores")
    .update({
      nombre_comercial,
      descripcion,
      telefono,
      email_contacto,
      logo_url,
      website,
      instagram,
      facebook,
      whatsapp,
      contacto_principal,
    })
    .eq("id", proveedor.id);

  if (updateError)
    return NextResponse.json({ error: updateError.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
