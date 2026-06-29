import { NextResponse } from "next/server";
import {
  updateProduct,
  deleteProduct
} from "@/lib/db/product-repository";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const product = await updateProduct(params.id, body);

  return NextResponse.json({
    success: true,
    product
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await deleteProduct(params.id);

  return NextResponse.json({
    success: true
  });
}
