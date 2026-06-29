import { NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/orders/order-service";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Missing status" },
        { status: 400 }
      );
    }

    const updated = await updateOrderStatus(id, status);

    return NextResponse.json({
      success: true,
      order: updated
    });
  } catch (err) {
    console.error("PATCH /orders status error:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
