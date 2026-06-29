import "./globals.css";
import type { Metadata, Viewport } from "next";

import { CartProvider } from "@/lib/cart";

export const metadata: Metadata = {
  title: "GaoTranHuy - Gạo sạch cho mọi gia đình",
  description:
    "Cung cấp gạo ST25, Jasmine, Bắc Hương chất lượng cao tại Việt Nam.",
  keywords: [
    "gạo sạch",
    "gạo ST25",
    "gạo ngon",
    "mua gạo online",
  ],
  metadataBase: new URL("https://tranhuygao.vn"),
  openGraph: {
    title: "GaoTranHuy",
    description: "Gạo sạch chất lượng cao",
    url: "https://tranhuygao.vn",
    siteName: "GaoTranHuy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GaoTranHuy",
    description: "Gạo sạch Việt Nam",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>

      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
