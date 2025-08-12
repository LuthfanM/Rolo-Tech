import { Product } from "@/types/common";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article>
      <Link
        href={`/products/${product.id}/${product.slug}`}
        className="group block"
      >
        <div className="rounded-2xl border border-slate-300 p-4">
          <img
            src={product.url}
            alt={product.title}
            className="mx-auto h-64 w-auto object-contain"
            loading="lazy"
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-900">
            {product.title}
          </h3>
          <div className="whitespace-nowrap text-lg font-semibold text-slate-900">
            ${product.price.toLocaleString()}
          </div>
        </div>
        <p className="mt-2 text-slate-500 text-[15px]">{product.shortDesc}</p>
      </Link>
    </article>
  );
}
