import * as React from "react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <main className="py-20 text-center">
      <Container>
        <h1 className="text-2xl font-semibold text-green-600">
          Đặt hàng thành công 🎉
        </h1>

        <p className="mt-3 text-gray-600">
          Cảm ơn bạn đã mua hàng. Chúng tôi sẽ liên hệ sớm nhất.
        </p>

        <div className="mt-6">
          <Link href="/">
            <Button>Về trang chủ</Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
