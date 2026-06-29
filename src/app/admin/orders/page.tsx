"use client";

import * as React from "react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getOrdersFromDB } from "@/lib/db/order-repository";

export default function AdminOrdersPage() {
  const [orders, setOrders] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    try {
      const data = await getOrdersFromDB();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    await loadOrders();
  }

  return (
    <main className="py-10">
      <Container>
        <h1 className="text-2xl font-semibold mb-6">
          Quản lý đơn hàng
        </h1>

        {loading && (
          <p className="text-gray-500 mb-4">
            Đang tải dữ liệu...
          </p>
        )}

        <div className="space-y-4">
          {orders.length === 0 && !loading && (
            <p className="text-gray-500">
              Chưa có đơn hàng nào
            </p>
          )}

          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border p-4 space-y-3"
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
                      : order.status === "completed"
                      ? "secondary"
                      : "destructive"
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

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateStatus(order.id, "processing")
                  }
                >
                  Xử lý
                </Button>

                <Button
                  size="sm"
                  onClick={() =>
                    updateStatus(order.id, "completed")
                  }
                >
                  Hoàn thành
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() =>
                    updateStatus(order.id, "cancelled")
                  }
                >
                  Huỷ
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
