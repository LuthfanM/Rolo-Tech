"use server";

import { CartItem } from "@/types/Cart";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createStripeCheckout(items: CartItem[]) {
  if (!items?.length) throw new Error("Cart is empty.");

  const currency = process.env.STRIPE_CURRENCY || "usd";

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
    (i) => ({
      quantity: i.qty,
      price_data: {
        currency,
        unit_amount: Math.round(i.price * 100), // dollars -> cents
        product_data: {
          name: i.title + (i.variantId ? ` (${i.variantId})` : ""),
          images: i.image?.startsWith("http") ? [i.image] : undefined,
          metadata: i.variantId ? { variant: i.variantId } : undefined,
        },
      },
    })
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: process.env.STRIPE_SUCCESS_URL!,
    cancel_url: process.env.STRIPE_CANCEL_URL!,
    // (optional) pass your own metadata for later reconciliation / webhook
    metadata: {
      app: "rolo-commerce",
    },
  });

  return { url: session.url! };
}
