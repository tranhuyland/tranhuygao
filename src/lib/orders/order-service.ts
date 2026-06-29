import type { Order, CustomerInfo } from "./order-types";
import { generateOrderId, formatOrderDate } from "./order-utils";

import {
  createOrderInDB,
  getOrderByIdFromDB,
  getOrdersFromDB,
  updateOrderStatusInDB
} from "@/lib/db/order-repository";

/**
 * UPDATE ORDER STATUS (service layer)
 */
export async function updateOrderStatus(
  id: string,
  status: "pending" | "processing" | "completed" | "cancelled"
) {
  if (!id) {
    throw new Error("Order ID is required");
  }

  const allowedStatuses = [
    "pending",
    "processing",
    "completed",
    "cancelled"
  ] as const;

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid status value");
  }

  const updated = await updateOrderStatusInDB(id, status);

  if (!updated) {
    throw new Error("Order not found or update failed");
  }

  return updated;
}

/**
 * CREATE ORDER (service layer)
 */
export async function createOrder(params: {
  customer: CustomerInfo;
  items: Order["items"];
  total: number;
}): Promise<Order> {
  if (!params?.customer || !params.items?.length) {
    throw new Error("Invalid order data");
  }

  const newOrder: Order = {
    id: generateOrderId(),
    customer: params.customer,
    items: params.items,
    total: params.total,
    status: "pending",
    createdAt: formatOrderDate()
  };

  await createOrderInDB(newOrder);

  return newOrder;
}

/**
 * GET ORDER BY ID
 */
export async function getOrderById(id: string): Promise<Order | null> {
  if (!id) return null;

  return await getOrderByIdFromDB(id);
}

/**
 * GET ALL ORDERS
 */
export async function getOrders(): Promise<Order[]> {
  return await getOrdersFromDB();
}
