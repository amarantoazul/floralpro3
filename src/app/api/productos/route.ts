import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

/**
 * 📦 GET /api/productos
 * Devuelve todos los productos publicados por proveedores, productores o agentes.
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("productos")
      .select(`
        id,
        nombre,
        descripcion,
        precio,
        imagen_url,
        tipo_vendedor,
        vendedor_id,
        proveedores ( nombre_comercial ),
        productores ( nombre_comercial ),
        agentes ( nombre_comercial )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error obteniendo productos:", error.message);
      return NextResponse.json(
        { error: "Error al obtener productos" },
        { status: 500 }
      );
    }

    // ✅ Corrige el acceso: cada relación es un array
    const productos = data.map((p: any) => {
      let nombreVendedor: string | undefined;

      if (p.tipo_vendedor === "proveedor") {
        nombreVendedor = p.proveedores?.[0]?.nombre_comercial;
      } else if (p.tipo_vendedor === "productor") {
        nombreVendedor = p.productores?.[0]?.nombre_comercial;
      } else if (p.tipo_vendedor === "agente") {
        nombreVendedor = p.agentes?.[0]?.nombre_comercial;
      }

      return {
        id: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: p.precio,
        imagen_url: p.imagen_url,
        tipo_vendedor: p.tipo_vendedor,
        vendedor_id: p.vendedor_id,
        vendedor_nombre: nombreVendedor ?? "Sin nombre",
      };
    });

    return NextResponse.json(productos);
  } catch (err) {
    console.error("Error general en GET /api/productos:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * 🧾 POST /api/productos
 * Permite a proveedores, productores o agentes crear nuevos productos.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, descripcion, precio, imagen_url, tipo_vendedor } = body;

    if (!nombre || !precio || !tipo_vendedor) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Obtener sesión activa
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const userId = session.user.id;
    let vendedorId: string | null = null;

    // Determinar el vendedor según tipo
    if (tipo_vendedor === "proveedor") {
      const { data } = await supabase
        .from("proveedores")
        .select("id")
        .eq("user_id", userId)
        .single();
      vendedorId = data?.id ?? null;
    } else if (tipo_vendedor === "productor") {
      const { data } = await supabase
        .from("productores")
        .select("id")
        .eq("user_id", userId)
        .single();
      vendedorId = data?.id ?? null;
    } else if (tipo_vendedor === "agente") {
      const { data } = await supabase
        .from("agentes")
        .select("id")
        .eq("user_id", userId)
        .single();
      vendedorId = data?.id ?? null;
    }

    if (!vendedorId) {
      return NextResponse.json(
        { error: "No se encontró el perfil del vendedor." },
        { status: 404 }
      );
    }

    // Crear producto
    const { error: insertError } = await supabase.from("productos").insert([
      {
        nombre,
        descripcion,
        precio,
        imagen_url,
        tipo_vendedor,
        vendedor_id: vendedorId,
      },
    ]);

    if (insertError) {
      console.error("Error al crear producto:", insertError.message);
      return NextResponse.json(
        { error: "No se pudo crear el producto" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error general en POST /api/productos:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * 🗑 DELETE /api/productos?id=<uuid>
 * Permite eliminar un producto publicado.
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Falta el ID del producto" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("productos").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar producto:", error.message);
      return NextResponse.json(
        { error: "No se pudo eliminar el producto" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error general en DELETE /api/productos:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
