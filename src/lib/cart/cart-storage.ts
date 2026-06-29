import type { CartState } from "./cart-types";

const CART_KEY = "tranhuygao_cart";

export function getCartFromStorage(): CartState {
  if (typeof window === "undefined") {
    return { items: [] };
  }

  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return { items: [] };

  try {
    return JSON.parse(raw);
  } catch {
    return { items: [] };
  }
}

export function saveCartToStorage(state: CartState) {
  if (typeof window === "undefined") return;

  localStorage.setItem(CART_KEY, JSON.stringify(state));
}

export function clearCartStorage() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(CART_KEY);
}
