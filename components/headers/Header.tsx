"use client";

import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo/AppLogo";
import { Button } from "@/components/ui/Button";
import { CartButton } from "@/components/buttons/CartButton";
import SearchBar from "@/components/inputs/SearchBar";
import Link from "next/link";

function FilterIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 5 21 5 14 12 14 19 10 21 10 12 3 5" />
    </svg>
  );
}

export function Header() {
  const router = useRouter();

  return (
    <header className="border-b border-slate-200">
      <div className="md:mx-auto px-10 py-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          <div className="flex-1 min-w-0 flex items-end gap-3 justify-end">
            <SearchBar />

            <Button
              variant="outline"
              size="square"
              aria-label="Filters"
              title="Filters"
              className="
                w-11 h-11 rounded-lg
                md:w-[120px] md:h-[32px] px-[10px] md:rounded-[4px]
                gap-[10px] md:justify-start
              "
            >
              <span className="md:hidden">
                <FilterIcon />
              </span>
              <span className="hidden md:inline mx-auto my-auto">Filters</span>
            </Button>

            {/* Cart: icon on mobile, text on desktop */}
            <CartButton count={0} onClick={() => router.push("/cart")} />
          </div>
        </div>
      </div>
    </header>
  );
}
