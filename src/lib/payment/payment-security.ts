import crypto from "crypto";

/**
 * VERIFY VNPay / MoMo / Stripe SIGNATURE
 * (generic HMAC SHA256 example)
 */
export function verifyPaymentSignature(params: {
  data: Record<string, any>;
  signature: string;
  secret: string;
}) {
  const sortedKeys = Object.keys(params.data).sort();

  const rawString = sortedKeys
    .map((key) => `${key}=${params.data[key]}`)
    .join("&");

  const expectedSignature = crypto
    .createHmac("sha256", params.secret)
    .update(rawString)
    .digest("hex");

  return expectedSignature === params.signature;
}
