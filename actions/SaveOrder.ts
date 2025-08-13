// app/actions/saveOrder.ts
"use server";

import { appendOrderRow } from "@/lib/GoogleSheet";
import { CartItem } from "@/types/Cart";

export type Customer = {
  name: string;
  email: string;
  street: string;
  unit?: string;
  postal: string;
};

export async function saveOrderToSheet(
  customer: Customer,
  items: CartItem[],
  total: number
) {
  const ts = new Date().toISOString();
  const lines = items
    .map(
      (i) =>
        `${i.title}${i.variantId ? ` (${i.variantId})` : ""} x${i.qty} @ ${
          i.price
        }`
    )
    .join(" | ");

  await appendOrderRow([
    ts,
    customer.name,
    customer.email,
    customer.street,
    customer.unit || "",
    customer.postal,
    lines,
    total,
  ]);

  return { ok: true };
}
