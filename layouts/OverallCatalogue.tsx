"use client";

import { useSearchParams } from "next/navigation";
import products from "@/data/products.json";
import { ProductCard } from "@/components/cards/ProductCard";

type Product = (typeof products)[number];

export default function OverallCatalogue() {
  const params = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();

  const filtered = (products as Product[]).filter((p) =>
    p.title.toLowerCase().includes(q)
  );

  return (
    <section>
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">Breville</h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.title} product={p} />
        ))}
      </div>
    </section>
  );
}
