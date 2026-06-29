export interface NavigationItem {
  label: string;

  href: string;
}

export const navigation: NavigationItem[] = [
  {
    label: "Trang chủ",
    href: "/"
  },

  {
    label: "Sản phẩm",
    href: "/san-pham"
  },

  {
    label: "Tin tức",
    href: "/tin-tuc"
  },

  {
    label: "Giới thiệu",
    href: "/gioi-thieu"
  },

  {
    label: "Liên hệ",
    href: "/lien-he"
  }
];
