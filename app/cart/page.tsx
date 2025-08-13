"use client";

import MainLayout from "@/layouts/MainLayout";
import { useCart } from "@/providers/CartContext";
import ProductPanelAction from "@/components/panels/ProductPanelAction";
import { formatUSD } from "@/helpers/commons";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { items, total } = useCart();

  return (
    <MainLayout
      hideHeader
      footerContent={
        <ProductPanelAction
          price={total}
          buttonLabel="Check Out"
          onClick={() => router.push("/checkout")}
        />
      }
    >
      <section className="mx-auto w-full max-w-4xl align-middle justify-center py-[80px]">
        <div className="mb-6 flex items-baseline justify-between">
          <h1 className="text-3xl font-semibold text-slate-900">Your Cart</h1>
          <div className="text-xl text-slate-400">
            {items.reduce((a, b) => a + b.qty, 0)} items
          </div>
        </div>

        <ul className="divide-y divide-slate-200">
          {items.map((it, idx) => (
            <li
              key={`${it.id}-${it.variantId ?? "base"}-${idx}`}
              className="flex items-start gap-6 py-6"
            >
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white p-1">
                {it.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={it.image}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="h-full w-full bg-slate-100" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-medium text-slate-900">
                      {it.title}
                    </div>
                    {it.variantId && (
                      <div className="text-slate-500 mt-1">
                        {variantLabel(it.variantId)}
                      </div>
                    )}
                  </div>
                  <div className="text-slate-900 font-medium">
                    {formatUSD(it.price)}
                  </div>
                </div>
                x
                <div className="mt-1 text-slate-400 text-sm">
                  {it.qty} {it.qty > 1 ? "units" : "unit"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </MainLayout>
  );
}
