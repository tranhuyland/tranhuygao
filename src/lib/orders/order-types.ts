import type { CartItem } from "@/lib/cart";

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  customer: CustomerInfo;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
}
