"use client";

import type { ReactNode, MouseEventHandler } from "react";

type Variant = "solid" | "wine" | "outline" | "outlineDark";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-gold text-ink hover:bg-gold-light",
  wine: "bg-wine text-cream hover:bg-gold hover:text-ink",
  outline:
    "border border-cream/40 text-cream hover:border-cream hover:bg-cream/10",
  outlineDark:
    "border border-ink text-ink hover:bg-ink hover:text-cream",
};

const BASE =
  "group relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full text-center font-semibold tracking-wide transition-all duration-300 disabled:cursor-wait disabled:opacity-70";

const SIZES = {
  md: "px-8 py-3.5 text-sm",
  sm: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export function ShimmerButton({
  href,
  onClick,
  type = "button",
  variant = "solid",
  size = "md",
  className = "",
  disabled,
  children,
}: {
  href?: string;
  onClick?: MouseEventHandler;
  type?: "button" | "submit";
  variant?: Variant;
  size?: "md" | "sm" | "lg";
  className?: string;
  disabled?: boolean;
  children: ReactNode;
}) {
  const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
