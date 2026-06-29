import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orders/order-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { customer, items, total } = body;

    if (!customer || !items || !total) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = await createOrder({
      customer,
      items,
      total
    });

    return NextResponse.json({
      success: true,
      order
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
