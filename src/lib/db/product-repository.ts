import { prisma } from "./prisma";

/**
 * CREATE PRODUCT
 */
export async function createProduct(data: any) {
  return prisma.product.create({
    data
  });
}

/**
 * UPDATE PRODUCT
 */
export async function updateProduct(id: string, data: any) {
  return prisma.product.update({
    where: { id },
    data
  });
}

/**
 * DELETE PRODUCT
 */
export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id }
  });
}

/**
 * GET ALL PRODUCTS
 */
export async function getProducts() {
  return prisma.product.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
}

/**
 * GET PRODUCT BY ID
 */
export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id }
  });
}
