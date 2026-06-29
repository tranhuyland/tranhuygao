import { NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/orders/order-service";

type Context = {
  params: {
    id: string;
  };
};

export async function PATCH(req: Request, context: Context) {
  try {
    const { id } = context.params;

    const body = await req.json();
    const { status } = body;

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
