import type { Order, CustomerInfo } from "./order-types";
import { generateOrderId, formatOrderDate } from "./order-utils";

let orders: Order[] = [];

/**
 * CREATE ORDER (mock DB)
 */
export async function createOrder(params: {
  customer: CustomerInfo;
  items: Order["items"];
  total: number;
}): Promise<Order> {
  const newOrder: Order = {
    id: generateOrderId(),
    customer: params.customer,
    items: params.items,
    total: params.total,
    status: "pending",
    createdAt: formatOrderDate()
  };

  orders.push(newOrder);

  return newOrder;
}

/**
 * GET ORDER BY ID
 */
export async function getOrderById(id: string) {
  return orders.find((o) => o.id === id) || null;
}

/**
 * GET ALL ORDERS (admin use)
 */
export async function getOrders() {
  return orders;
}
