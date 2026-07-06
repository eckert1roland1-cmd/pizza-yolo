import Link from "next/link";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <span
        aria-hidden
        className="inline-block h-7 w-7 shrink-0 bg-current"
        style={{
          WebkitMaskImage: "url(/brand/icon-source.png)",
          maskImage: "url(/brand/icon-source.png)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
      <span className="font-display text-3xl tracking-tight">Pizza Yolo</span>
    </Link>
  );
}
