"use client";

import type { ReactNode, MouseEventHandler } from "react";

type Variant = "solid" | "wine" | "outline";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-gold text-ink hover:bg-gold-light",
  wine: "bg-wine text-cream hover:bg-gold hover:text-ink",
  outline:
    "border border-cream/40 text-cream hover:border-cream hover:bg-cream/10",
};

const BASE =
  "group relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full text-center font-semibold tracking-wide transition-all duration-300 active:scale-[0.97] disabled:cursor-wait disabled:opacity-70";

const SIZES = {
  md: "px-8 py-3.5 text-sm",
  sm: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

function Sheen({ variant }: { variant: Variant }) {
  if (variant === "outline") return null;
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 -skew-x-12 -translate-x-[250%] bg-white/35 transition-transform duration-700 ease-out group-hover:translate-x-[420%]"
    />
  );
}

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
        <Sheen variant={variant} />
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      <Sheen variant={variant} />
    </button>
  );
}
