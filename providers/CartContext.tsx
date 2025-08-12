"use client";

import { CartState, CartItem } from "@/types/Cart";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartCtx = createContext<CartState | null>(null);

const LS_ITEMS = "rolo-app";
const LS_SELECTED = "rolo-app-selected";

function keyOf(id: number, variantId?: string) {
  return `${id}${variantId ? `-${variantId}` : ""}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selected, setSelected] = useState<Record<number, string | undefined>>(
    {}
  );

  // hydrate items
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_ITEMS);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(LS_ITEMS, JSON.stringify(items));
    } catch {}
  }, [items]);

  // hydrate selected variants
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_SELECTED);
      if (raw) setSelected(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(LS_SELECTED, JSON.stringify(selected));
    } catch {}
  }, [selected]);

  const addItem: CartState["addItem"] = (item, qty = 1) => {
    setItems((prev) => {
      const map = new Map(prev.map((i) => [keyOf(i.id, i.variantId), i]));
      const k = keyOf(item.id, item.variantId);
      const existing = map.get(k);
      if (existing) {
        existing.qty += qty;
        map.set(k, { ...existing });
      } else {
        map.set(k, { ...item, qty });
      }
      return Array.from(map.values());
    });
  };

  const removeItem: CartState["removeItem"] = (id, variantId) => {
    setItems((prev) =>
      prev.filter((i) => !(i.id === id && i.variantId === variantId))
    );
  };

  const setQty: CartState["setQty"] = (id, qty, variantId) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id && i.variantId === variantId
            ? { ...i, qty: Math.max(0, qty) }
            : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const clear = () => setItems([]);

  const { count, total } = useMemo(() => {
    return {
      count: items.reduce((a, b) => a + b.qty, 0),
      total: items.reduce((a, b) => a + b.qty * b.price, 0),
    };
  }, [items]);

  // NEW: selection helpers
  const getSelectedVariant: CartState["getSelectedVariant"] = (productId) =>
    selected[productId];
  const setSelectedVariant: CartState["setSelectedVariant"] = (
    productId,
    variantId
  ) => {
    setSelected((prev) => ({ ...prev, [productId]: variantId }));
  };

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
  };

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
