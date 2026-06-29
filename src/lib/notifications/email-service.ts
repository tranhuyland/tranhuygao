type OrderEmailParams = {
  to: string;
  orderId: string;
  customerName: string;
  total: number;
};

export async function sendOrderConfirmationEmail(
  params: OrderEmailParams
) {
  // MOCK EMAIL SERVICE (later replace SendGrid / Resend)
  console.log("📧 SEND EMAIL TO CUSTOMER");

  console.log({
    to: params.to,
    subject: `Xác nhận đơn hàng #${params.orderId}`,
    content: `
      Xin chào ${params.customerName},

      Đơn hàng của bạn đã được ghi nhận.
      Mã đơn: ${params.orderId}
      Tổng tiền: ${params.total} VND

      Cảm ơn bạn đã mua hàng!
    `
  });

  return true;
}
