"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const hasSale =
    Boolean(product.salePrice && product.salePrice < product.price);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "₫";
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      {/* IMAGE */}
      <Link href={`/san-pham/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />

          <div className="absolute left-2 top-2 flex gap-2">
            {product.featured && (
              <Badge variant="default">Nổi bật</Badge>
            )}

            {hasSale && (
              <Badge variant="destructive">Giảm giá</Badge>
            )}
          </div>
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-teal-700">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-gray-500 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* PRICE */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-sm font-semibold text-gray-900">
            {formatPrice(product.salePrice ?? product.price)}
          </span>

          {hasSale && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* ACTION */}
        <div className="pt-2">
          <Button
            className="w-full"
            size="sm"
            onClick={() =>
              addItem({
                product,
                quantity: 1
              })
            }
          >
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </Card>
  );
}
