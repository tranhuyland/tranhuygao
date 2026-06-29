import type { Product } from "@/types/product";

/**
 * Mock data layer (có thể thay bằng API / Google Sheets / CMS sau này)
 * Tách riêng để không ảnh hưởng UI
 */
const mockProducts: Product[] = [
  {
    id: "1",
    slug: "gao-st25-thom-luc",
    name: "Gạo ST25 thơm lức",
    sku: "ST25-01",
    category: "gao-st25",
    description: "Gạo ST25 chất lượng cao, hạt dài, thơm tự nhiên.",
    shortDescription: "Gạo ST25 thơm ngon, chuẩn xuất khẩu.",
    images: ["/images/st25.jpg"],
    price: 28000,
    salePrice: 25000,
    stock: 100,
    featured: true,
    unit: "kg",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01"
  },
  {
    id: "2",
    slug: "gao-jasmine-thom",
    name: "Gạo Jasmine thơm",
    sku: "JM-01",
    category: "gao-jasmine",
    description: "Gạo Jasmine dẻo thơm, phù hợp bữa ăn gia đình.",
    shortDescription: "Gạo Jasmine mềm, thơm nhẹ.",
    images: ["/images/jasmine.jpg"],
    price: 22000,
    stock: 80,
    featured: false,
    unit: "kg",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01"
  }
];

/**
 * Lấy toàn bộ sản phẩm
 */
export async function getProducts(): Promise<Product[]> {
  // simulate async (sau này thay API)
  return Promise.resolve(mockProducts);
}

/**
 * Lấy sản phẩm theo slug
 */
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const product = mockProducts.find((p) => p.slug === slug);
  return product ?? null;
}

/**
 * Lấy sản phẩm nổi bật
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  return mockProducts.filter((p) => p.featured);
}
