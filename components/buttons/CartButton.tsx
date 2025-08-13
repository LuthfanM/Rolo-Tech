"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/providers/CartContext";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CartIcon } from "@/svgs/CartIcon";

export function CartButton() {
  const router = useRouter();
  const { count, hasItems } = useCart();
  const prevCount = useRef<number>(count);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (count > prevCount.current) {
      toast.success("Item added to cart");
      setShake(true);
      const t = setTimeout(() => setShake(false), 650);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count]);

  const base =
    "w-11 h-11 md:w-[120px] md:h-[32px] px-[10px] md:rounded-[4px] justify-center md:justify-start";
  const active =
    "bg-darkGreen hover:bg-emerald-800 text-white border border-darkGreen";
  const inactive = "border border-slate-300 text-darkGreen";

  return (
    <Button
      onClick={() => router.push("/cart")}
      aria-label="Cart"
      title="Cart"
      className={`${base} ${hasItems ? active : inactive}`}
      size="square"
      badge={count > 99 ? "99+" : count || undefined}
    >
      <span className={`md:hidden ${shake ? "cart-shake" : ""}`}>
        <CartIcon filled={hasItems} />
      </span>
      <span
        className={`hidden md:inline mx-auto my-auto ${
          shake ? "md:cart-shake" : ""
        }`}
      >
        Your Cart
      </span>
    </Button>
  );
}
