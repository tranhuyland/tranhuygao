import { db } from "./client";
import type { Order } from "@/lib/orders/order-types";
import { generateOrderId } from "@/lib/orders/order-utils";

export async function createOrderInDB(order: Order) {
  await db.order.create({
    id: order.id,
    customer_name: order.customer.name,
    customer_phone: order.customer.phone,
    customer_address: order.customer.address,
    total: order.total,
    status: order.status,
    created_at: order.createdAt
  });

  await db.orderItem.createMany(
    order.items.map((item) => ({
      id: generateOrderId() + "-ITEM",
      order_id: order.id,
      product_id: item.product.id,
      product_name: item.product.name,
      price:
        item.product.salePrice &&
        item.product.salePrice < item.product.price
          ? item.product.salePrice
          : item.product.price,
      quantity: item.quantity
    }))
  );

  return order;
}
