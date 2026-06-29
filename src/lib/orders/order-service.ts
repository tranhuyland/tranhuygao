import type { Order, CustomerInfo } from "./order-types";
import { generateOrderId, formatOrderDate } from "./order-utils";

import {
  createOrderInDB,
  getOrderByIdFromDB,
  getOrdersFromDB
} from "@/lib/db/order-repository";

/**
 * CREATE ORDER (service layer)
 * - business logic
 * - delegate persistence to repository
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

  // persist via DB layer
  await createOrderInDB(newOrder);

  return newOrder;
}

/**
 * GET ORDER BY ID
 */
export async function getOrderById(id: string): Promise<Order | null> {
  return await getOrderByIdFromDB(id);
}

/**
 * GET ALL ORDERS (admin use)
 */
export async function getOrders(): Promise<Order[]> {
  return await getOrdersFromDB();
}
