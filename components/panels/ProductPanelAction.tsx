"use client";

import { formatUSD } from "@/helpers/commons";
import { useRouter } from "next/navigation";

type Props = {
  price: number;
  onClick: () => void;
  priceLabel?: string;
  buttonLabel?: string;
  disabled?: boolean;
};

export default function ProductFooterAction({
  price,
  onClick,
  priceLabel,
  buttonLabel,
  disabled = false,
}: Props) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between border-t border-slate-200 bg-white p-4 md:px-[40px]">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 rounded-lg bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200"
      >
        <span>&lsaquo;</span> Back
      </button>

      <div className="flex items-center gap-4">
        <div className="text-xl font-semibold text-darkGreen">
          {priceLabel && `${priceLabel}: `}
          {formatUSD(price)}
        </div>
        <button
          disabled={disabled}
          aria-disabled={disabled}
          onClick={onClick}
          className={`flex items-center gap-2 rounded-lg px-5 py-2 text-white transition
            ${
              disabled
                ? "bg-darkGreen/50 cursor-not-allowed"
                : "bg-darkGreen hover:bg-emerald-800"
            }`}
        >
          {buttonLabel || "Add to Cart"} <span>&rsaquo;</span>
        </button>
      </div>
    </div>
  );
}
