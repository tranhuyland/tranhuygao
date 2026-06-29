import { NextResponse } from "next/server";
import { createPayment } from "@/lib/payment/payment-service";

export async function POST(req: Request) {
  const body = await req.json();

  const { orderId, amount, provider } = body;

  const result = await createPayment({
    orderId,
    amount,
    provider
  });

  return NextResponse.json(result);
}
