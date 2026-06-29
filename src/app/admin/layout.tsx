import * as React from "react";
import Link from "next/link";

import { Container } from "@/components/ui/container";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* SIMPLE ADMIN HEADER */}
      <header className="border-b bg-white">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <Link href="/admin" className="font-semibold">
              Admin Panel
            </Link>

            <nav className="flex gap-4 text-sm">
              <Link href="/admin/orders">Đơn hàng</Link>
              <Link href="/san-pham">Sản phẩm</Link>
              <Link href="/">Website</Link>
            </nav>
          </div>
        </Container>
      </header>

      <main>{children}</main>
    </div>
  );
}
