"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useCart } from "@/lib/cart";
import { calculateCartTotal } from "@/lib/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart } = useCart();

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const total = calculateCartTotal(state.items);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN").format(price) + "₫";

  async function handleSubmit() {
    if (loading) return;

    if (!name || !phone || !address) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (state.items.length === 0) {
      alert("Giỏ hàng trống");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customer: {
            name,
            phone,
            address
          },
          items: state.items,
          total
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Order failed");
      }

      clearCart();
      router.push("/dat-hang-thanh-cong");
    } catch (err) {
      alert("Đặt hàng thất bại, vui lòng thử lại");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="py-10">
      <Container>
        <h1 className="mb-6 text-2xl font-semibold">
          Thanh toán
        </h1>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* FORM */}
          <div className="space-y-4">
            <Input
              placeholder="Họ tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />

            <Input
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />

            <Input
              placeholder="Địa chỉ giao hàng"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={loading}
            />

            <Button
              className="w-full"
              size="lg"
              onClick={handleSubmit}
              disabled={loading || state.items.length === 0}
            >
              {loading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
            </Button>
          </div>

          {/* ORDER SUMMARY */}
          <div className="rounded-xl border p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">
              Đơn hàng của bạn
            </h2>

            <div className="space-y-3">
              {state.items.map((item) => {
                const price =
                  item.product.salePrice &&
                  item.product.salePrice < item.product.price
                    ? item.product.salePrice
                    : item.product.price;

                return (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>

                    <span>
                      {formatPrice(price * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-semibold">
              <span>Tổng cộng</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
