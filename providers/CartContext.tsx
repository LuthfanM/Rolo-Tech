"use client";

import { CartState, CartItem } from "@/types/Cart";
import React, { createContext, useContext, useMemo, useState } from "react";

const CartCtx = createContext<CartState | null>(null);

function keyOf(id: number, variantId?: string) {
  return `${id}${variantId ? `-${variantId}` : ""}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [variantSelected, setvariantSelected] = useState<
    Record<number, string | undefined>
  >({});
  const [imageSelected, setimageSelected] = useState<
    Record<number, number | undefined>
  >({});

  const addItem: CartState["addItem"] = (item, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.id === item.id && i.variantId === item.variantId
      );

      if (idx !== -1) {
        const next = [...prev];
        const existing = next[idx];
        next[idx] = { ...existing, qty: existing.qty + qty };
        return next;
      }

      return [...prev, { ...item, qty }];
    });
  };

  const removeItem: CartState["removeItem"] = (id, variantId) =>
    setItems((prev) =>
      prev.filter((i) => !(i.id === id && i.variantId === variantId))
    );

  const setQty: CartState["setQty"] = (id, qty, variantId) =>
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id && i.variantId === variantId
            ? { ...i, qty: Math.max(0, qty) }
            : i
        )
        .filter((i) => i.qty > 0)
    );

  const clear = () => setItems([]);

  const { count, total } = useMemo(
    () => ({
      count: items.reduce((a, b) => a + b.qty, 0),
      total: items.reduce((a, b) => a + b.qty * b.price, 0),
    }),
    [items]
  );

  const getSelectedVariant = (pid: number) => variantSelected[pid];
  const setSelectedVariant = (pid: number, vid?: string) =>
    setvariantSelected((prev) => ({ ...prev, [pid]: vid }));

  const getSelectedImage = (pid: number) => imageSelected[pid];
  const setSelectedImage = (pid: number, index: number) =>
    setimageSelected((prev) => ({ ...prev, [pid]: index }));

  const value: CartState = {
    items,
    addItem,
    removeItem,
    clear,
    setQty,
    count,
    total,
    hasItems: count > 0,
    getSelectedVariant,
    setSelectedVariant,
    getSelectedImage,
    setSelectedImage,
  };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
