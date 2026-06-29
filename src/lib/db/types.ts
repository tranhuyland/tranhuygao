export interface DBOrder {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  created_at: string;
}

export interface DBOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}
