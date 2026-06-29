import type { Metadata } from "next";
import Container from "@/components/ui/container";
import ProductGrid from "@/components/features/products/product-grid";
import { getProducts } from "@/lib/products/product-service";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sản phẩm gạo sạch",
  description:
    "Danh sách các loại gạo sạch ST25, Jasmine, Bắc Hương chất lượng cao."
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="py-10">
      <Container>
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">
          Sản phẩm
        </h1>

        <ProductGrid products={products} />
      </Container>
    </main>
  );
}
