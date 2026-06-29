import type { Product } from "@/types/product";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border p-3 rounded">
          <img src={p.images?.[0]} alt={p.name} />
          <h3>{p.name}</h3>
          <p>{p.price.toLocaleString()} đ</p>
        </div>
      ))}
    </div>
  );
}
