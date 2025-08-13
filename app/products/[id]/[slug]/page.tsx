"use client";

import MainLayout from "@/layouts/MainLayout";
import ProductGallery, {
  ProductGalleryHandle,
} from "@/components/cards/ProductGallery";
import details from "@/data/productDetails.json";
import { formatUSD, resolvePrice } from "@/helpers/commons";
import { notFound, redirect } from "next/navigation";
import ProductPanelAction from "@/components/panels/ProductPanelAction";
import { useCart } from "@/providers/CartContext";
import { useEffect, useMemo, useRef } from "react";
import React from "react";

type Detail = (typeof details)[number];
type Props = { params: Promise<{ id: string; slug: string }> };

export default function ProductDetailPage({ params }: Props) {
  const { id, slug } = React.use(params);

  const {
    addItem,
    getSelectedVariant,
    setSelectedVariant,
    getSelectedImage,
    setSelectedImage,
  } = useCart();

  const _id = Number(id);
  const data = (details as Detail[]).find((d) => d.id === _id);

  if (!data) notFound();

  if (data.slug && data.slug !== slug) {
    redirect(`/products/${data.id}/${data.slug}`);
  }

  const selectedVariantKey = getSelectedVariant(data.id);
  const firstVariant = data.variants?.[0];
  const initialIndex = useMemo(() => {
    const idxFromContext = getSelectedImage(data.id);
    if (typeof idxFromContext === "number") return idxFromContext;
    if (selectedVariantKey) {
      const v = data.variants?.find((x) => x.key === selectedVariantKey);
      if (v) return v.imageIndex ?? 0;
    }
    return firstVariant?.imageIndex ?? 0;
  }, [data, selectedVariantKey, getSelectedImage]);

  const { listPrice, price } = resolvePrice({
    listPrice: data.pricing?.listPrice ?? undefined,
    price: data.pricing?.price,
    discountPercent: data.pricing?.discountPercent ?? undefined,
  });

  useEffect(() => {
    if (!data.variants?.length) return;
    if (!selectedVariantKey) setSelectedVariant(data.id, firstVariant?.key);

    if (getSelectedImage(data.id) == null)
      setSelectedImage(data.id, firstVariant?.imageIndex ?? 0);
  }, [
    data.id,
    data.variants,
    selectedVariantKey,
    setSelectedVariant,
    getSelectedImage,
    setSelectedImage,
    firstVariant,
  ]);

  const galleryRef = useRef<ProductGalleryHandle>(null);

  const handleSlideChange = React.useCallback(
    (index: number) => {
      setSelectedImage(data.id, index);
      const match = data.variants?.find((v) => v.imageIndex === index);
      if (match) setSelectedVariant(data.id, match.key);
    },
    [data.id, data.variants, setSelectedImage, setSelectedVariant]
  );

  return (
    <MainLayout
      footerContent={
        <ProductPanelAction
          price={price}
          onClick={() => {
            const variantId = getSelectedVariant(data.id);
            const imgIndex = getSelectedImage(data.id) ?? 0;
            addItem(
              {
                id: data.id,
                title: data.title,
                price,
                image: data.images?.[imgIndex],
                variantId,
              },
              1
            );
          }}
        />
      }
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ProductGallery
          ref={galleryRef}
          images={data.images}
          initialIndex={initialIndex}
          onChange={handleSlideChange}
        />

        <aside className="md:sticky md:top-10 md:h-[calc(100dvh-80px)] overflow-auto pr-2">
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
          {!!data.variants?.length && (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-700">Colour</h3>
                <div className="text-sm text-slate-400">
                  {data.variants.find(
                    (v) => v.key === getSelectedVariant(data.id)
                  )?.label ?? "—"}
                </div>
              </div>
              <div className="mt-3 flex gap-3">
                {data.variants.map((v) => {
                  const active = v.key === getSelectedVariant(data.id);
                  return (
                    <button
                      key={v.key}
                      onClick={() => {
                        setSelectedVariant(data.id, v.key);
                        setSelectedImage(data.id, v.imageIndex ?? 0);
                        galleryRef.current?.scrollTo(v.imageIndex ?? 0);
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
          )}

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="whitespace-pre-line text-slate-700 leading-relaxed">
              {data.long}
            </p>
          </div>

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
