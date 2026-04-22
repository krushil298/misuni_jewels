"use client";

interface MisuniLogoProps {
  color?: string;
  className?: string;
  size?: number;
}

export function MisuniLogoMark({ color = "currentColor", className, size = 28 }: MisuniLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 80"
      fill="none"
      className={className}
      aria-label="Misuni Jewels logo mark"
    >
      {/* Left wing */}
      <path
        d="M10 70 Q10 20 50 10 Q25 25 20 70 Z"
        fill={color}
        opacity={0.9}
      />
      {/* Right wing */}
      <path
        d="M90 70 Q90 20 50 10 Q75 25 80 70 Z"
        fill={color}
        opacity={0.9}
      />
      {/* Center cross / diamond overlay */}
      <path
        d="M35 65 Q50 30 65 65 Q55 40 50 25 Q45 40 35 65 Z"
        fill={color}
        opacity={0.6}
      />
    </svg>
  );
}
