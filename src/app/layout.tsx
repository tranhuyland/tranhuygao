import "./globals.css";
import type { Viewport } from "next";
import { defaultMetadata } from "@/config/site";
import { CartProvider } from "@/lib/cart";

export const metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1
};


export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
