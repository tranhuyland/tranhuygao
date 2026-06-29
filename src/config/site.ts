import type { Metadata } from "next";

export const siteConfig = {
  name: "GaoTranHuy",

  shortName: "GTH",

  description:
    "Chuyên cung cấp gạo ST25, Jasmine, Bắc Hương, Nàng Thơm và nhiều loại gạo sạch chất lượng cao.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tranhuygao.vn",

  ogImage: "/images/og-image.jpg",

  logo: "/images/logo.svg",

  email: "huy07kt@gmail.com",

  phone: "590000",

  locale: "vi_VN",

  keywords: [
    "gạo",
    "gạo sạch",
    "gạo ST25",
    "gạo Jasmine",
    "gạo Bắc Hương",
    "gạo Nàng Thơm",
    "mua gạo online"
  ]
} as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },

  description: siteConfig.description,

  keywords: [...siteConfig.keywords],

  applicationName: siteConfig.name,

  creator: "TranHuyLand",

  publisher: "TranHuyLand",

  alternates: {
    canonical: "/"
  },

  robots: {
    index: true,
    follow: true
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage]
  }
};
