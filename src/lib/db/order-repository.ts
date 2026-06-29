import { prisma } from "./prisma";
import type { Order } from "@/lib/orders/order-types";


/**
 * UPDATE ORDER STATUS
 */
export async function updateOrderStatusInDB(
  id: string,
  status: "pending" | "processing" | "completed" | "cancelled"
) {
  return prisma.order.update({
    where: { id },
    data: { status }
  });
}
/**
 * CREATE ORDER
 */
export async function createOrderInDB(order: Order) {
  return prisma.order.create({
    data: {
      id: order.id,
      customerName: order.customer.name,
      customerPhone: order.customer.phone,
      customerAddress: order.customer.address,
      total: order.total,
      status: order.status,

      items: {
        create: order.items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          price:
            item.product.salePrice &&
            item.product.salePrice < item.product.price
              ? item.product.salePrice
              : item.product.price,
          quantity: item.quantity
        }))
      }
    },
    include: {
      items: true
    }
  });
}

/**
 * GET ORDER BY ID
 */
export async function getOrderByIdFromDB(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: { items: true }
  });
}

/**
 * GET ALL ORDERS
 */
export async function getOrdersFromDB() {
  return prisma.order.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: { items: true }
  });
}
