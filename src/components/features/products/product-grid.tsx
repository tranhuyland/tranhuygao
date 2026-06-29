import type { Product } from "@/types/product";
import Image from "next/image";

export default function ProductGrid({ products = [] }: { products?: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border p-3 rounded hover:shadow-sm transition">
          
          {/* IMAGE */}
          <div className="relative w-full aspect-square bg-gray-100">
            <Image
              src={p.images?.[0] || "/placeholder.jpg"}
              alt={p.name}
              fill
              className="object-cover rounded"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>

          {/* NAME */}
          <h3 className="mt-2 text-sm font-semibold line-clamp-2">
            {p.name}
          </h3>

          {/* PRICE */}
          <p className="text-sm text-gray-700">
            {Number(p.price).toLocaleString("vi-VN")} đ
          </p>
        </div>
      ))}
    </div>
  );
}
