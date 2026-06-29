import { NextResponse } from "next/server";
import { updatePaymentStatus } from "@/lib/db/payment-repository";
import { updateOrderStatusInDB } from "@/lib/db/order-repository";

/**
 * PAYMENT WEBHOOK (VNPay / MoMo / Stripe)
 * - verify signature (simplified here)
 * - update payment status
 * - update order status
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      paymentId,
      orderId,
      status,
      amount
    } = body;

    // ⚠️ REAL PROJECT: verify signature here
    // (VNPay / MoMo / Stripe signature validation)

    if (!paymentId || !orderId) {
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    // 1. Update payment status
    await updatePaymentStatus(paymentId, status);

    // 2. If payment success → update order
    if (status === "paid") {
      await updateOrderStatusInDB(orderId, "processing");
    }

    return NextResponse.json({
      success: true
    });
  } catch (err) {
    console.error("Webhook error:", err);

    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    );
  }
}
