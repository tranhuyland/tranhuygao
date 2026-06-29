import { NextResponse } from "next/server";
import { sendOrderConfirmationEmail } from "@/lib/notifications/email-service";
import { updatePaymentStatus } from "@/lib/db/payment-repository";
import { updateOrderStatusInDB } from "@/lib/db/order-repository";
import { decreaseStock } from "@/lib/inventory/inventory-service";
import { verifyPaymentSignature } from "@/lib/payment/payment-security";

const PAYMENT_SECRET = process.env.PAYMENT_SECRET || "demo_secret";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      paymentId,
      orderId,
      status,
      amount,
      signature
    } = body;

    // 1. VERIFY SIGNATURE (CRITICAL SECURITY STEP)
    const isValid = verifyPaymentSignature({
      data: {
        paymentId,
        orderId,
        status,
        amount
      },
      signature,
      secret: PAYMENT_SECRET
    });

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    // 2. UPDATE PAYMENT
    await updatePaymentStatus(paymentId, status);

    if (status === "paid") {
  // 1. update order
  await updateOrderStatusInDB(orderId, "processing");

  // 2. decrease stock (QUAN TRỌNG)
  await decreaseStock(body.items || []);

  // 3. send email
  await sendOrderConfirmationEmail({
    to: body.customerEmail || "customer@demo.com",
    orderId,
    customerName: body.customerName || "Khách hàng",
    total: amount
  });
}

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);

    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    );
  }
}
