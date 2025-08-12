"use client";

import MainLayout from "@/layouts/MainLayout";
import ProductGallery, {
  ProductGalleryHandle,
} from "@/components/cards/ProductGallery";
import details from "@/data/productDetails.json";
import { formatUSD, resolvePrice } from "@/helpers/commons";
import { notFound, redirect } from "next/navigation";
import ProductFooterAction from "@/components/panels/ProductPanelAction";
import { useCart } from "@/providers/CartContext";
import { useEffect, useRef } from "react";

type Detail = (typeof details)[number];
type Props = { params: { id: string; slug: string } };

export default function ProductDetailPage({ params }: Props) {
  const galleryRef = useRef<ProductGalleryHandle>(null);
  const { addItem, getSelectedVariant, setSelectedVariant } = useCart();

  const id = Number(params.id);
  const data = (details as Detail[]).find((d) => d.id === id);

  if (!data) notFound();

  if (data.slug && data.slug !== params.slug) {
    redirect(`/products/${data.id}/${data.slug}`);
  }

  const selectedKey = getSelectedVariant(data.id);

  const { listPrice, price } = resolvePrice({
    listPrice: data.pricing?.listPrice ?? undefined,
    price: data.pricing?.price,
    discountPercent: data.pricing?.discountPercent ?? undefined,
  });

  useEffect(() => {
    if (!data.variants?.length) return;
    if (selectedKey) return;

    const first = data.variants[0];
    setSelectedVariant(data.id, first.key);
    queueMicrotask(() => {
      galleryRef.current?.scrollTo(first.imageIndex ?? 0);
    });
  }, [data.id, data.variants, selectedKey, setSelectedVariant]);

  return (
    <MainLayout
      footerContent={
        <ProductFooterAction
          price={price}
          onAddToCart={() => {
            const variantId = getSelectedVariant(data.id);
            addItem(
              {
                id: data.id,
                title: data.title,
                price,
                image: data.images?.[0],
                variantId,
              },
              1
            );
          }}
        />
      }
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ProductGallery ref={galleryRef} images={data.images} />

        {/* Right: sticky details */}
        <aside className="md:sticky md:top-10 md:h-[calc(100dvh-80px)] overflow-auto pr-2">
          {/* Breadcrumbs */}
          {data.breadcrumbs?.length ? (
            <nav className="text-sm text-slate-400">
              {data.breadcrumbs.join("  »  ")}
            </nav>
          ) : null}

          <h1 className="mt-3 text-4xl font-semibold text-slate-900">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="mt-2 text-slate-500">{data.subtitle}</p>
          )}

          <div className="mt-6 flex items-baseline gap-4">
            {listPrice && listPrice > price ? (
              <>
                <span className="text-slate-300 line-through">
                  {formatUSD(listPrice)}
                </span>
                <span className="text-2xl font-semibold text-darkGreen">
                  {formatUSD(price)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold text-slate-900">
                {formatUSD(price)}
              </span>
            )}
          </div>
          {data.variants?.length ? (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-700">Colour</h3>
                <div className="text-sm text-slate-400">
                  {data.variants.find((v) => v.key === selectedKey)?.label ??
                    data.variants[0].label}
                </div>
              </div>

              <div className="mt-3 flex gap-3">
                {data.variants.map((v) => {
                  const active = v.key === selectedKey;
                  return (
                    <button
                      key={v.key}
                      onClick={() => {
                        galleryRef.current?.scrollTo(v.imageIndex);
                        setSelectedVariant(data.id, v.key);
                      }}
                      className={`h-8 w-8 rounded-md border transition
                        ${
                          active
                            ? "border-slate-900 ring-2 ring-slate-300"
                            : "border-slate-300 hover:border-slate-400"
                        }`}
                      style={{ backgroundColor: v.swatch }}
                      title={v.label}
                      aria-label={`Select ${v.label}`}
                    />
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="whitespace-pre-line text-slate-700 leading-relaxed">
              {data.long}
            </p>
          </div>

          {/* More Info */}
          {data.moreInfo?.items?.length ? (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="text-sm font-medium text-slate-700">
                {data.moreInfo.heading || "More Info"}
              </h3>
              <ul className="mt-3 list-disc pl-5 text-slate-700 space-y-1">
                {data.moreInfo.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </MainLayout>
  );
}
