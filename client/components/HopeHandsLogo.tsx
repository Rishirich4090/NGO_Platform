interface HopeHandsLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "text";
  className?: string;
}

export default function HopeHandsLogo({
  size = "md",
  variant = "full",
  className = "",
}: HopeHandsLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const iconSize = sizeClasses[size];
  const textSize = textSizeClasses[size];

  const LogoIcon = () => (
    <div className={`${iconSize} relative ${className}`}>
      {/* Outer circle with gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-green-500 shadow-lg"></div>

      {/* Inner design - helping hands */}
      <div className="relative flex h-full w-full items-center justify-center rounded-full">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 text-white drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Two hands reaching towards each other in a helping gesture */}
          {/* Left hand reaching out to help */}
          <path
            d="M4 12c0-1.5 1-3 2.5-3.5L8 8c1-0.5 2 0 2.5 1l1 2c0.5 1 0.5 2 0 3l-1.5 2c-0.5 0.5-1 0.5-1.5 0L4 14c-1-1-1-1.5 0-2z"
            fill="currentColor"
            opacity="0.9"
          />

          {/* Right hand reaching out to give help */}
          <path
            d="M20 12c0-1.5-1-3-2.5-3.5L16 8c-1-0.5-2 0-2.5 1l-1 2c-0.5 1-0.5 2 0 3l1.5 2c0.5 0.5 1 0.5 1.5 0L20 14c1-1 1-1.5 0-2z"
            fill="currentColor"
            opacity="0.9"
          />

          {/* Heart symbol in the center where hands meet */}
          <path
            d="M12 10c-1 0-2 1-2 2 0 1.5 2 3.5 2 3.5s2-2 2-3.5c0-1-1-2-2-2z"
            fill="currentColor"
            opacity="0.8"
          />

          {/* Small connecting elements showing unity */}
          <circle cx="10" cy="12" r="0.5" fill="currentColor" opacity="0.7" />
          <circle cx="14" cy="12" r="0.5" fill="currentColor" opacity="0.7" />

          {/* Hope rays emanating from the center */}
          <g opacity="0.6" stroke="currentColor" strokeWidth="0.4" fill="none">
            <line x1="12" y1="5" x2="12" y2="7" />
            <line x1="12" y1="17" x2="12" y2="19" />
            <line x1="7" y1="12" x2="9" y2="12" />
            <line x1="15" y1="12" x2="17" y2="12" />
            <line x1="8.5" y1="8.5" x2="9.5" y2="9.5" />
            <line x1="14.5" y1="14.5" x2="15.5" y2="15.5" />
            <line x1="15.5" y1="8.5" x2="14.5" y2="9.5" />
            <line x1="9.5" y1="14.5" x2="8.5" y2="15.5" />
          </g>
        </svg>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-yellow-300/20 to-green-400/20 blur-sm -z-10"></div>
    </div>
  );

  const LogoText = () => (
    <span
      className={`${textSize} font-bold bg-gradient-to-r from-green-700 via-yellow-600 to-green-600 bg-clip-text text-transparent ${className}`}
    >
      HopeHands
    </span>
  );

  if (variant === "icon") {
    return <LogoIcon />;
  }

  if (variant === "text") {
    return <LogoText />;
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <LogoIcon />
      <LogoText />
    </div>
  );
}
