import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/orders/order-service";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { error: "Missing status" },
        { status: 400 }
      );
    }

    const updatedOrder = await updateOrderStatus(id, status);

    return NextResponse.json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    console.error("PATCH /orders/[id]/status error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
