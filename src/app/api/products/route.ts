import { NextResponse } from "next/server";
import { createProduct, getProducts } from "@/lib/db/product-repository";

export async function GET() {
  const products = await getProducts();

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await createProduct({
      slug: body.slug,
      name: body.name,
      sku: body.sku,
      category: body.category,
      description: body.description,
      shortDescription: body.shortDescription,
      images: body.images || [],
      price: body.price,
      salePrice: body.salePrice,
      stock: body.stock,
      featured: body.featured ?? false,
      unit: body.unit
    });

    return NextResponse.json({
      success: true,
      product
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Create product failed" },
      { status: 500 }
    );
  }
}
