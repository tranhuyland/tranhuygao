import type { CartItem } from "./cart-types";

export function calculateCartTotal(items: CartItem[]) {
  return items.reduce((total, item) => {
    const price =
      item.product.salePrice && item.product.salePrice < item.product.price
        ? item.product.salePrice
        : item.product.price;

    return total + price * item.quantity;
  }, 0);
}

export function calculateCartCount(items: CartItem[]) {
  return items.reduce((count, item) => count + item.quantity, 0);
}
