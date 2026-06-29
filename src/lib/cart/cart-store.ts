"use client";

import * as React from "react";

import type { CartState, CartItem } from "./cart-types";
import {
  getCartFromStorage,
  saveCartToStorage
} from "./cart-storage";

interface CartContextValue {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState<CartState>({
    items: []
  });

  // hydrate from storage
  React.useEffect(() => {
    const cart = getCartFromStorage();
    setState(cart);
  }, []);

  // persist
  React.useEffect(() => {
    saveCartToStorage(state);
  }, [state]);

  function addItem(item: CartItem) {
    setState((prev) => {
      const existing = prev.items.find(
        (i) => i.product.id === item.product.id
      );

      if (existing) {
        return {
          items: prev.items.map((i) =>
            i.product.id === item.product.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        };
      }

      return {
        items: [...prev.items, item]
      };
    });
  }

  function removeItem(productId: string) {
    setState((prev) => ({
      items: prev.items.filter(
        (i) => i.product.id !== productId
      )
    }));
  }

  function clearCart() {
    setState({ items: [] });
  }

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = React.useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return ctx;
}
