import Image from "next/image";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <Image
        src="/brand/logo-mark.png"
        alt="IBÉRICO crest"
        fill
        sizes="48px"
        className="object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
        priority
      />
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-display tracking-[0.08em]">IBÉRICO</span>
    </span>
  );
}
