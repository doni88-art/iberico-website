import Image from "next/image";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center text-cream">
      <div className="absolute inset-0">
        <Image
          src="/images/real-exterior-night.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/85 to-ink" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <LogoMark className="h-14 w-14" />
        <p className="mt-8 font-display text-8xl text-gold-light">404</p>
        <h1 className="font-display mt-4 text-3xl sm:text-4xl">
          This table isn&rsquo;t set.
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70 sm:text-base">
          The page you&rsquo;re looking for has wandered off. Let&rsquo;s get
          you back to the dining room.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex cursor-pointer items-center justify-center rounded-full bg-wine px-8 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-gold hover:text-ink"
        >
          Back to IBÉRICO
        </Link>
      </div>
    </div>
  );
}
