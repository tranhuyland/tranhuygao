import { NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/orders/order-service";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { error: "Missing status" },
        { status: 400 }
      );
    }

    const updated = await updateOrderStatus(params.id, status);

    return NextResponse.json({
      success: true,
      order: updated
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
