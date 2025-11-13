import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

type Pedido = {
  created_at: string;
  estado: string;
  total: number | null;
};

type Producto = {
  created_at: string;
  stock?: number | null;
};

const cumplidoEstados = ["aceptado", "completado", "entregado"];
const revisionEstados = ["revision", "pendiente", "en_revision"];
const canceladoEstados = ["cancelado", "rechazado"];

export async function GET() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const userId = session.user.id;

  const { data: proveedor, error: provError } = await supabase
    .from("proveedores")
    .select("id, nombre_comercial")
    .eq("user_id", userId)
    .single();

  if (provError || !proveedor) {
    return NextResponse.json(
      { error: "No se encontró el perfil del proveedor" },
      { status: 404 }
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [pedidosRes, productosRes] = await Promise.all([
    supabase
      .from("pedidos")
      .select("id, estado, total, created_at")
      .eq("proveedor_id", proveedor.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("productos")
      .select("id, created_at, stock")
      .eq("tipo_vendedor", "proveedor")
      .eq("vendedor_id", proveedor.id)
      .order("created_at", { ascending: false }),
  ]);

  if (pedidosRes.error) {
    return NextResponse.json(
      { error: pedidosRes.error.message },
      { status: 500 }
    );
  }

  if (productosRes.error) {
    return NextResponse.json(
      { error: productosRes.error.message },
      { status: 500 }
    );
  }

  const pedidos = (pedidosRes.data ?? []) as Pedido[];
  const productos = (productosRes.data ?? []) as Producto[];

  const pedidosHoy = pedidos.filter((p) => {
    if (!p.created_at) return false;
    const created = new Date(p.created_at);
    return created >= today;
  }).length;

  const productosPublicados = productos.length;
  const pedidosRevision = pedidos.filter((p) => {
    const estado = (p.estado || "").toLowerCase();
    return revisionEstados.includes(estado);
  }).length;
  const cancelaciones = pedidos.filter((p) => {
    const estado = (p.estado || "").toLowerCase();
    return canceladoEstados.includes(estado);
  }).length;

  const cumplidos = pedidos.filter((p) => {
    const estado = (p.estado || "").toLowerCase();
    return cumplidoEstados.includes(estado);
  }).length;
  const porcentajeCumplimiento = pedidos.length
    ? Math.round((cumplidos / pedidos.length) * 100)
    : 0;

  const stockBajo = productos.filter((producto) => {
    if (typeof producto.stock !== "number") return false;
    return producto.stock < 50;
  }).length;

  return NextResponse.json({
    proveedor: proveedor.nombre_comercial,
    pedidosHoy,
    stockBajo,
    productosPublicados,
    porcentajeCumplimiento,
    cancelaciones,
    pedidosRevision,
  });
}