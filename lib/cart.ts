"use client";

import { useState, useEffect, useCallback } from "react";
import type { CartItem, CartStore, Product } from "@/types";

const CART_KEY = "uf_cart";

function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function computeStore(items: CartItem[]): CartStore {
  return {
    items,
    total: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    count: items.reduce((sum, i) => sum + i.quantity, 0),
  };
}

export function useCart() {
  const [store, setStore] = useState<CartStore>({ items: [], total: 0, count: 0 });

  useEffect(() => {
    setStore(computeStore(getStoredCart()));

    function onStorage(e: StorageEvent) {
      if (e.key === CART_KEY) {
        setStore(computeStore(getStoredCart()));
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem = useCallback(
    (product: Product, size?: string, color?: string) => {
      const items = getStoredCart();
      const idx = items.findIndex(
        (i) =>
          i.product.id === product.id &&
          i.selected_size === size &&
          i.selected_color === color
      );

      if (idx > -1) {
        items[idx].quantity += 1;
      } else {
        items.push({
          product,
          quantity: 1,
          selected_size: size,
          selected_color: color,
        });
      }

      saveCart(items);
      setStore(computeStore(items));
    },
    []
  );

  const removeItem = useCallback((productId: string, size?: string, color?: string) => {
    const items = getStoredCart().filter(
      (i) =>
        !(
          i.product.id === productId &&
          i.selected_size === size &&
          i.selected_color === color
        )
    );
    saveCart(items);
    setStore(computeStore(items));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, size?: string, color?: string) => {
      if (quantity <= 0) {
        removeItem(productId, size, color);
        return;
      }
      const items = getStoredCart().map((i) =>
        i.product.id === productId &&
        i.selected_size === size &&
        i.selected_color === color
          ? { ...i, quantity }
          : i
      );
      saveCart(items);
      setStore(computeStore(items));
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    saveCart([]);
    setStore({ items: [], total: 0, count: 0 });
  }, []);

  return { ...store, addItem, removeItem, updateQuantity, clearCart };
}
