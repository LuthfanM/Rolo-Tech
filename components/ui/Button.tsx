"use client";

import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "square";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  badge?: number | string; // e.g. cart count
};

function cx(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(" ");
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "solid",
      size = "md",
      leftIcon,
      rightIcon,
      badge,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "relative inline-flex items-center justify-center font-medium transition-colors outline-none";
    const variants = {
      solid: "bg-appGray text-black",
      outline:
        "border border-slate-300 text-slate-600 bg-white hover:bg-slate-50",
      ghost: "text-slate-700 hover:bg-slate-100",
    }[variant];

    const sizes = {
      sm: "h-9 px-3 rounded-lg text-sm",
      md: "h-11 px-4 rounded-xl text-sm",
      lg: "h-12 px-5 rounded-2xl text-base",
      square: "h-11 w-11 rounded-xl",
    }[size];

    return (
      <button
        ref={ref}
        className={cx(base, variants, sizes, className)}
        {...props}
      >
        {leftIcon && <span className="mr-2 -ml-1">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2 -mr-1">{rightIcon}</span>}
        {badge !== undefined && badge !== null && String(badge) !== "0" && (
          <span
            className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-emerald-500 text-white text-[11px] leading-5 text-center border border-white"
            aria-label="badge"
          >
            {badge}
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
