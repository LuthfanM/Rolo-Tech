"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  placeholder?: string;
  className?: string;
  debounceMs?: number; // default 250
};

function SearchIcon() {
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
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-3.6-3.6" />
    </svg>
  );
}

export default function SearchBar({
  placeholder = "Search",
  className = "",
  debounceMs = 250,
}: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const initial = params.get("q") ?? "";
  const [q, setQ] = useState(initial);

  // keep local input synced with URL changes
  useEffect(() => setQ(initial), [initial]);

  const isHome = useMemo(() => pathname === "/", [pathname]);

  // Live-update URL only on home (`/`), so OverallCatalogue reacts immediately
  useEffect(() => {
    if (!isHome) return;
    const t = setTimeout(() => {
      const url = q ? `/?q=${encodeURIComponent(q)}` : "/";
      router.replace(url);
    }, debounceMs);
    return () => clearTimeout(t);
  }, [q, isHome, router, debounceMs]);

  const submit = (value: string) => {
    // If user presses Enter anywhere, navigate to home with q
    const url = value ? `/?q=${encodeURIComponent(value)}` : "/";
    router.push(url);
  };

  return (
    <div className={`flex-1 md:flex-none ${className}`}>
      <div
        className="
          flex items-center
          w-full h-11 rounded-xl
          md:w-[400px] md:h-[32px] md:rounded-[4px]
          border border-slate-300 bg-white
          px-3 gap-2
          md:px-[10px] md:gap-[10px]
        "
      >
        <span className="text-slate-400">
          <SearchIcon />
        </span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit(q)}
          placeholder={placeholder}
          aria-label="Search"
          className="flex-1 bg-transparent outline-none text-[15px] placeholder-slate-400"
        />
      </div>
    </div>
  );
}
