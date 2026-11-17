import { useId } from 'react';

export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps {
  size?: LogoSize;
  showWordmark?: boolean;
  className?: string;
}

const SIZE_CONFIG: Record<
  LogoSize,
  { icon: number; textClass: string; gapClass: string }
> = {
  sm: {
    icon: 28,
    textClass: 'text-base tracking-tight',
    gapClass: 'gap-2',
  },
  md: {
    icon: 36,
    textClass: 'text-lg tracking-tight',
    gapClass: 'gap-2.5',
  },
  lg: {
    icon: 46,
    textClass: 'text-2xl tracking-tight',
    gapClass: 'gap-3',
  },
};

export function Logo({
  size = 'md',
  showWordmark = true,
  className = '',
}: LogoProps) {
  const uid = useId().replace(/:/g, '');
  const strokeGradId = `ms-stroke-${uid}`;
  const bgGradId = `ms-bg-${uid}`;
  const accentGradId = `ms-accent-${uid}`;

  const config = SIZE_CONFIG[size];

  return (
    <span
      className={`inline-flex items-center select-none ${config.gapClass} ${className}`.trim()}
    >
      <svg
        width={config.icon}
        height={config.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient
            id={bgGradId}
            x1="6"
            y1="4"
            x2="42"
            y2="44"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#162645" />
            <stop offset="100%" stopColor="#0B1220" />
          </linearGradient>
          <linearGradient
            id={strokeGradId}
            x1="6"
            y1="4"
            x2="42"
            y2="44"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#3B9EFF" />
            <stop offset="100%" stopColor="#62C8FF" />
          </linearGradient>
          <linearGradient
            id={accentGradId}
            x1="12"
            y1="14"
            x2="37"
            y2="35"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#62C8FF" />
            <stop offset="55%" stopColor="#3B9EFF" />
            <stop offset="100%" stopColor="#2575D8" />
          </linearGradient>
        </defs>

        {/* Rounded hexagon / squircle badge */}
        <path
          d="M24 3.5L39.2 9.8C41.5 10.75 43 12.98 43 15.46V32.54C43 35.02 41.5 37.25 39.2 38.2L24 44.5L8.8 38.2C6.5 37.25 5 35.02 5 32.54V15.46C5 12.98 6.5 10.75 8.8 9.8L24 3.5Z"
          fill={`url(#${bgGradId})`}
          stroke={`url(#${strokeGradId})`}
          strokeWidth="1.8"
        />

        {/* Subtle inner geometric facet */}
        <path
          d="M24 6.8L37.4 12.35C38.65 12.87 39.5 14.1 39.5 15.46V32.54C39.5 33.9 38.65 35.13 37.4 35.65L24 41.2"
          stroke="#62C8FF"
          strokeOpacity="0.16"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Interlocking geometric M */}
        <path
          d="M12.5 32.5V16.5L19.5 24.5L26.5 16.5V22"
          stroke="#F5F7FA"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Interlocking geometric S */}
        <path
          d="M35.5 17.5H27.2C25.43 17.5 24 18.84 24 20.5C24 22.16 25.43 23.5 27.2 23.5H32.3C34.07 23.5 35.5 24.84 35.5 26.5V29C35.5 30.93 33.93 32.5 32 32.5H23.5"
          stroke={`url(#${accentGradId})`}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Precision terminal node */}
        <circle cx="35.5" cy="17.5" r="1.4" fill="#62C8FF" />
      </svg>

      {showWordmark && (
        <span
          className={`font-semibold text-text-primary lowercase ${config.textClass}`}
        >
          mussirin
          <span className="text-electric-blue">dev</span>
        </span>
      )}
    </span>
  );
}
