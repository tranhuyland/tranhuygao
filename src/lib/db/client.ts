import type { DBOrder, DBOrderItem } from "./types";

let orders: DBOrder[] = [];
let orderItems: DBOrderItem[] = [];

export const db = {
  order: {
    create: async (data: DBOrder) => {
      orders.push(data);
      return data;
    },

    findMany: async () => {
      return orders;
    },

    findById: async (id: string) => {
      return orders.find((o) => o.id === id) || null;
    }
  },

  orderItem: {
    createMany: async (items: DBOrderItem[]) => {
      orderItems.push(...items);
      return items;
    },

    findByOrderId: async (orderId: string) => {
      return orderItems.filter((i) => i.order_id === orderId);
    }
  }
};
