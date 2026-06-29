import type { PaymentProvider } from "./payment-types";
import { createPaymentInDB } from "@/lib/db/payment-repository";

/**
 * CREATE PAYMENT (abstraction layer)
 */
export async function createPayment(params: {
  orderId: string;
  amount: number;
  provider: PaymentProvider;
}) {
  const payment = await createPaymentInDB({
    orderId: params.orderId,
    amount: params.amount,
    provider: params.provider,
    status: "pending"
  });

  // mock redirect URL (later replace VNPay/MoMo/Stripe)
  const redirectUrl = `/payment/redirect/${payment.id}`;

  return {
    payment,
    redirectUrl
  };
}
