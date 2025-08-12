"use client";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/providers/CartContext";
import { CartIcon } from "@/svgs/CartIcon";
import { useToast } from "@/hooks/useToast";
import { useEffect, useRef, useState } from "react";

type Props = {
  onClick?: () => void;
};

export function CartButton({ onClick }: Props) {
  const { count, hasItems } = useCart();
  const { show } = useToast();
  const prevCount = useRef<number>(count);
  const [shake, setShake] = useState<boolean>(false);

  useEffect(() => {
    if (count > prevCount.current) {
      show("Added to cart");
      setShake(true);
      const t = setTimeout(() => setShake(false), 650);
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count, show]);

  return (
    <Button
      onClick={onClick}
      aria-label="Cart"
      title="Cart"
      className={
        hasItems
          ? "w-11 h-11 md:w-[120px] md:h-[32px] md:px-[10px] md:rounded-[4px] justify-center md:justify-start bg-darkGreen hover:bg-emerald-800 text-white border border-darkGreen"
          : "w-11 h-11 md:w-[120px] md:h-[32px] md:px-[10px] md:rounded-[4px] justify-center md:justify-start border border-slate-300 text-darkGreen"
      }
      size="square"
      badge={count > 99 ? "99+" : count || undefined}
    >
      <span className="md:hidden">
        <CartIcon filled={hasItems} />
      </span>
      <span className="hidden md:inline mx-auto my-auto">Your Cart</span>
    </Button>
  );
}
