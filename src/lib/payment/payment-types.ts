export type PaymentProvider = "vnpay" | "momo" | "stripe";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  provider: PaymentProvider;
  status: PaymentStatus;
  createdAt: string;
}
