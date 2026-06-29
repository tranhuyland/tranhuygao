import { getProductById } from "@/lib/db/product-repository";

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}) {
  const product = await getProductById(params.slug);

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại"
    };
  }

  return {
    title: `${product.name} | TranhuyGao`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images
    }
  };
}
