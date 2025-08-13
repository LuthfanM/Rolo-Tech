"use client";

import React, {
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";

export type ProductGalleryHandle = { scrollTo: (index: number) => void };

export default forwardRef(function ProductGallery(
  {
    images,
    initialIndex = 0,
    onChange,
  }: {
    images: string[];
    initialIndex?: number;
    onChange?: (index: number) => void;
  },
  ref: React.Ref<ProductGalleryHandle>
) {
  const [selected, setSelected] = useState(initialIndex);
  const [mainRef, mainApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    startIndex: initialIndex,
  });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "keepSnaps",
  });

  const onChangeRef = useRef<typeof onChange>(undefined);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const handleSelect = useCallback(
    (api?: EmblaCarouselType) => {
      if (!api) return;
      const i = api.selectedScrollSnap();
      setSelected((prev) => (prev === i ? prev : i));
      onChangeRef.current?.(i);
      thumbApi?.scrollTo(i);
    },
    [thumbApi]
  );

  useEffect(() => {
    if (!mainApi) return;
    handleSelect(mainApi);
    mainApi.on("select", handleSelect);
    return () => {
      mainApi.off("select", handleSelect);
    };
  }, [mainApi, handleSelect]);

  useImperativeHandle(
    ref,
    () => ({
      scrollTo: (index: number) => mainApi?.scrollTo(index),
    }),
    [mainApi]
  );

  return (
    <div className="space-y-4">
      <div
        className="overflow-hidden rounded-2xl border border-slate-300"
        ref={mainRef}
      >
        <div className="flex">
          {images.map((src, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%] p-6">
              <img
                src={src}
                alt={`Image ${i + 1}`}
                className="mx-auto max-h-[520px] w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden" ref={thumbRef}>
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => mainApi?.scrollTo(i)}
              className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border p-1 transition
                ${
                  i === selected
                    ? "border-slate-900 ring-2 ring-slate-300"
                    : "border-slate-300 hover:border-slate-400"
                }`}
              aria-label={`Go to image ${i + 1}`}
            >
              <img src={src} alt="" className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
