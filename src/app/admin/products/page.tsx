"use client";

import * as React from "react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

import { getProducts } from "@/lib/db/product-repository";

export default function AdminProductsPage() {
  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getProducts();
    setProducts(data);
  }

  async function handleDelete(id: string) {
    await fetch(`/api/products/${id}`, {
      method: "DELETE"
    });

    await load();
  }

  return (
    <main className="py-10">
      <Container>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Quản lý sản phẩm
          </h1>

          <Button
            onClick={() => {
              const name = prompt("Tên sản phẩm?");
              if (!name) return;

              fetch("/api/products", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  name,
                  slug: name.toLowerCase().replaceAll(" ", "-"),
                  sku: "SKU-" + Date.now(),
                  category: "gao",
                  description: "",
                  shortDescription: "",
                  price: 100000,
                  stock: 10,
                  unit: "kg"
                })
              }).then(load);
            }}
          >
            + Thêm sản phẩm
          </Button>
        </div>

        <div className="space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-gray-500">
                  {p.price}₫ • tồn: {p.stock}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    alert("Edit UI sẽ nâng cấp sau")
                  }
                >
                  Sửa
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(p.id)}
                >
                  Xoá
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
