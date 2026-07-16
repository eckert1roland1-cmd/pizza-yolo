import Link from "next/link";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`inline-block ${className ?? ""}`}>
      <span
        aria-hidden
        className="block h-8 aspect-[4577/1496] bg-current"
        style={{
          WebkitMaskImage: "url(/brand/wordmark-source.png)",
          maskImage: "url(/brand/wordmark-source.png)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center left",
          maskPosition: "center left",
        }}
      />
      <span className="sr-only">Pizza Yolo</span>
    </Link>
  );
}
