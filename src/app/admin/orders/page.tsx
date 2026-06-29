import * as React from "react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

import { getOrdersFromDB } from "@/lib/db/order-repository";

export default async function AdminOrdersPage() {
  const orders = await getOrdersFromDB();

  return (
    <main className="py-10">
      <Container>
        <h1 className="text-2xl font-semibold mb-6">
          Quản lý đơn hàng
        </h1>

        <div className="space-y-4">
          {orders.length === 0 && (
            <p className="text-gray-500">
              Chưa có đơn hàng nào
            </p>
          )}

          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border p-4 space-y-2"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  {order.customerName}
                </div>

                <Badge
                  variant={
                    order.status === "pending"
                      ? "outline"
                      : order.status === "processing"
                      ? "default"
                      : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </div>

              {/* INFO */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>📞 {order.customerPhone}</p>
                <p>📍 {order.customerAddress}</p>
                <p>
                  💰{" "}
                  {new Intl.NumberFormat("vi-VN").format(
                    order.total
                  )}
                  ₫
                </p>
              </div>

              {/* ITEMS */}
              <div className="text-xs text-gray-500">
                {order.items?.map((item: any) => (
                  <div key={item.id}>
                    • {item.productName} x {item.quantity}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
