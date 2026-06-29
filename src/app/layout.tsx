import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gaotranhuu.com"),

  title: {
    default: "TranhuyGao",
    template: "%s | TranhuyGao",
  },

  description:
    "Website bán gạo sạch, gạo ST25, Jasmine, Bắc Hương, Nàng Thơm với giao hàng nhanh toàn quốc.",

  keywords: [
    "gạo",
    "gạo ST25",
    "gạo Jasmine",
    "gạo Bắc Hương",
    "gạo Nàng Thơm",
    "gạo sạch",
  ],

  applicationName: "TranhuyGao",

  creator: "TranHuyLand",

  publisher: "TranHuyLand",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
