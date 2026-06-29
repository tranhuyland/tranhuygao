import * as React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import Container from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getProductBySlug } from "@/lib/products/product-service";

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm",
    };
  }

  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const hasSale =
    product.salePrice !== null &&
    product.salePrice !== undefined &&
    product.salePrice < product.price;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN").format(price) + "₫";

  return (
    <main className="py-10">
      <Container>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={product.images[0] || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              {product.featured && <Badge>Best Seller</Badge>}

              {hasSale && (
                <Badge variant="destructive">
                  Giảm giá
                </Badge>
              )}
            </div>

            <h1 className="text-2xl font-semibold text-gray-900">
              {product.name}
            </h1>

            <p className="text-gray-600">
              {product.description}
            </p>

            <div className="space-y-1">
              <div className="text-xl font-semibold">
                {formatPrice(product.salePrice ?? product.price)}
              </div>

              {hasSale && (
                <div className="text-sm text-gray-400 line-through">
                  {formatPrice(product.price)}
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500">
              Còn lại: {product.stock} {product.unit}
            </p>

            <div className="pt-4">
              <Button className="w-full" size="lg">
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
