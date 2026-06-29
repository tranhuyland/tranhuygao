"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useCart } from "@/lib/cart";
import { calculateCartTotal } from "@/lib/cart";

export default function CartPage() {
  const { state, removeItem, clearCart } = useCart();

  const total = calculateCartTotal(state.items);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN").format(price) + "₫";

  return (
    <main className="py-10">
      <Container>
        <h1 className="mb-6 text-2xl font-semibold">
          Giỏ hàng
        </h1>

        {state.items.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Giỏ hàng trống
            <div className="mt-4">
              <Link href="/san-pham">
                <Button>Tiếp tục mua hàng</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* LIST */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 rounded-xl border p-4"
                >
                  {/* IMAGE */}
                  <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={
                        item.product.images[0] ||
                        "/placeholder.jpg"
                      }
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-medium">
                        {item.product.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        SL: {item.quantity}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        {formatPrice(
                          (item.product.salePrice &&
                          item.product.salePrice <
                            item.product.price
                            ? item.product.salePrice
                            : item.product.price) *
                            item.quantity
                        )}
                      </span>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          removeItem(item.product.id)
                        }
                      >
                        Xoá
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={clearCart}
              >
                Xoá toàn bộ
              </Button>
            </div>

            {/* SUMMARY */}
            <div className="rounded-xl border p-6 h-fit">
              <h2 className="text-lg font-semibold mb-4">
                Tóm tắt đơn hàng
              </h2>

              <div className="flex justify-between text-sm">
                <span>Tạm tính</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-semibold">
                <span>Tổng cộng</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Button className="w-full mt-6" size="lg">
                Thanh toán
              </Button>

              <Link href="/san-pham">
                <Button
                  variant="ghost"
                  className="w-full mt-2"
                >
                  Tiếp tục mua hàng
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
