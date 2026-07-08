type ShapeVariant = "square" | "dots" | "half-circle";

export function ShapeAccent({
  variant,
  className,
}: {
  variant: ShapeVariant;
  className?: string;
}) {
  if (variant === "square") {
    return (
      <svg aria-hidden viewBox="0 0 64 64" fill="none" className={className}>
        <rect
          x="8"
          y="8"
          width="48"
          height="48"
          stroke="currentColor"
          strokeWidth="2"
          transform="rotate(12 32 32)"
        />
      </svg>
    );
  }

  if (variant === "dots") {
    const dots = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 8; col++) {
        dots.push(
          <circle key={`${row}-${col}`} cx={col * 8 + 4} cy={row * 8 + 4} r="1.5" />
        );
      }
    }
    return (
      <svg aria-hidden viewBox="0 0 64 40" fill="currentColor" className={className}>
        {dots}
      </svg>
    );
  }

  return (
    <svg aria-hidden viewBox="0 0 64 32" fill="currentColor" className={className}>
      <path d="M0 32a32 32 0 0 1 64 0Z" />
    </svg>
  );
}
