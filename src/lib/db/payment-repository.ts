import { prisma } from "./prisma";

export async function createPaymentInDB(data: any) {
  return prisma.payment.create({
    data
  });
}

export async function updatePaymentStatus(
  id: string,
  status: string
) {
  return prisma.payment.update({
    where: { id },
    data: { status }
  });
}

export async function getPaymentById(id: string) {
  return prisma.payment.findUnique({
    where: { id }
  });
}
