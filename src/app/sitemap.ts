import { MetadataRoute } from "next";
import { getProducts } from "@/lib/db/product-repository";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const productUrls = products.map((p) => ({
    url: `https://gaotranhuy.com/san-pham/${p.slug}`,
    lastModified: new Date(p.updatedAt)
  }));

  return [
    {
      url: "https://gaotranhuy.com",
      lastModified: new Date()
    },
    {
      url: "https://tranhuygao.vn/san-pham",
      lastModified: new Date()
    },
    {
      url: "https://tranhuygao.vn/lien-he",
      lastModified: new Date()
    },
    ...productUrls
  ];
}
