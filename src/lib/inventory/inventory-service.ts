import { prisma } from "@/lib/db/prisma";

/**
 * DECREASE STOCK AFTER PAYMENT SUCCESS
 */
export async function decreaseStock(items: {
  productId: string;
  quantity: number;
}[]) {
  for (const item of items) {
    await prisma.product.update({
      where: { id: item.productId },
      data: {
        stock: {
          decrement: item.quantity
        }
      }
    });
  }
}
