import { useId } from 'react';

export type ProjectSlug =
  | 'packora'
  | 'testitime'
  | 'bawul'
  | 'yasselim'
  | 'countora'
  | 'gymtika'
  | 'gardenova'
  | 'alanya-adventure';

export interface ProjectIconProps {
  slug: string;
  accentColor?: string;
  secondaryColor?: string;
  size?: number;
  className?: string;
  title?: string;
}

const DEFAULT_COLORS: Record<string, { accent: string; secondary: string }> = {
  packora: { accent: '#3B9EFF', secondary: '#62C8FF' },
  testitime: { accent: '#6366F1', secondary: '#38BDF8' },
  bawul: { accent: '#F59E0B', secondary: '#FBBF24' },
  yasselim: { accent: '#A855F7', secondary: '#EC4899' },
  countora: { accent: '#06B6D4', secondary: '#3B9EFF' },
  gymtika: { accent: '#10B981', secondary: '#34D399' },
  gardenova: { accent: '#22C55E', secondary: '#84CC16' },
  'alanya-adventure': { accent: '#F97316', secondary: '#FACC15' },
};

export function ProjectIcon({
  slug,
  accentColor,
  secondaryColor,
  size = 64,
  className = '',
  title,
}: ProjectIconProps) {
  const uid = useId().replace(/:/g, '');
  const palette = DEFAULT_COLORS[slug] ?? {
    accent: '#3B9EFF',
    secondary: '#62C8FF',
  };
  const primary = accentColor || palette.accent;
  const secondary = secondaryColor || palette.secondary;

  const gradMain = `icon-main-${uid}`;
  const gradSoft = `icon-soft-${uid}`;
  const gradBg = `icon-bg-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`.trim()}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <defs>
        <linearGradient
          id={gradBg}
          x1="8"
          y1="6"
          x2="56"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#16243F" />
          <stop offset="100%" stopColor="#0B1220" />
        </linearGradient>
        <linearGradient
          id={gradMain}
          x1="12"
          y1="12"
          x2="52"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={secondary} />
          <stop offset="100%" stopColor={primary} />
        </linearGradient>
        <linearGradient
          id={gradSoft}
          x1="16"
          y1="14"
          x2="48"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={secondary} stopOpacity="0.28" />
          <stop offset="100%" stopColor={primary} stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* App icon squircle container */}
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="15"
        fill={`url(#${gradBg})`}
      />
      <rect
        x="4.75"
        y="4.75"
        width="54.5"
        height="54.5"
        rx="14.25"
        stroke={`url(#${gradMain})`}
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      {/* Subtle radial glow */}
      <circle cx="32" cy="30" r="20" fill={`url(#${gradSoft})`} />

      {renderIconGlyph(slug, gradMain, primary, secondary)}
    </svg>
  );
}

function renderIconGlyph(
  slug: string,
  gradMain: string,
  primary: string,
  secondary: string
) {
  switch (slug) {
    case 'packora':
      // Stylized suitcase + checkmark
      return (
        <g>
          {/* Suitcase handle */}
          <path
            d="M25 19V16.5C25 15.12 26.12 14 27.5 14H36.5C37.88 14 39 15.12 39 16.5V19"
            stroke={secondary}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Suitcase body */}
          <rect
            x="16"
            y="19"
            width="32"
            height="27"
            rx="6"
            fill={`url(#${gradMain})`}
            fillOpacity="0.2"
            stroke={`url(#${gradMain})`}
            strokeWidth="2.4"
          />
          {/* Vertical straps */}
          <path
            d="M24 19.5V45.5M40 19.5V45.5"
            stroke={primary}
            strokeOpacity="0.55"
            strokeWidth="2"
          />
          {/* Checkmark badge */}
          <circle cx="42" cy="41" r="8.5" fill="#0B1220" stroke={secondary} strokeWidth="2" />
          <path
            d="M38.2 41.2L40.8 43.8L46 38.4"
            stroke="#F5F7FA"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );

    case 'testitime':
      // Precision exam stopwatch / hourglass hybrid
      return (
        <g>
          {/* Top crown & side button */}
          <path
            d="M28 12H36M32 12V16M44.5 18.5L47.5 15.5"
            stroke={secondary}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Outer precision dial */}
          <circle
            cx="32"
            cy="34"
            r="16.5"
            fill={`url(#${gradMain})`}
            fillOpacity="0.14"
            stroke={`url(#${gradMain})`}
            strokeWidth="2.4"
          />
          {/* Progress arc */}
          <path
            d="M32 21.5A12.5 12.5 0 1 1 20.4 38.8"
            stroke={secondary}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* Hourglass / precision needle */}
          <path
            d="M32 26V34L37.5 37.5"
            stroke="#F5F7FA"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="34" r="2.2" fill={secondary} />
        </g>
      );

    case 'bawul':
      // Minimalist travel trunk + compass
      return (
        <g>
          {/* Trunk body */}
          <rect
            x="15"
            y="22"
            width="34"
            height="24"
            rx="5"
            fill={`url(#${gradMain})`}
            fillOpacity="0.18"
            stroke={`url(#${gradMain})`}
            strokeWidth="2.3"
          />
          {/* Trunk handle */}
          <path
            d="M26 22V18.5C26 17.12 27.12 16 28.5 16H35.5C36.88 16 38 17.12 38 18.5V22"
            stroke={secondary}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Corner clasps */}
          <path
            d="M22 22V46M42 22V46"
            stroke={primary}
            strokeOpacity="0.5"
            strokeWidth="2"
          />
          {/* Minimalist compass rose */}
          <circle
            cx="32"
            cy="34"
            r="7.5"
            fill="#0B1220"
            stroke={secondary}
            strokeWidth="1.8"
          />
          <path
            d="M32 28.5L34.2 34L32 39.5L29.8 34L32 28.5Z"
            fill={`url(#${gradMain})`}
          />
          <circle cx="32" cy="34" r="1.2" fill="#F5F7FA" />
        </g>
      );

    case 'yasselim':
      // Calm fountain pen nib + journal page
      return (
        <g>
          {/* Journal page */}
          <rect
            x="16"
            y="14"
            width="24"
            height="34"
            rx="4"
            fill={`url(#${gradMain})`}
            fillOpacity="0.14"
            stroke={`url(#${gradMain})`}
            strokeOpacity="0.7"
            strokeWidth="2"
          />
          {/* Calm ruled lines */}
          <path
            d="M21 23H34M21 29H31M21 35H28"
            stroke="#F5F7FA"
            strokeOpacity="0.65"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Fountain pen nib */}
          <path
            d="M44.5 22L49 26.5L39.5 44.5L32.5 47.5L35.5 40.5L44.5 22Z"
            fill="#0B1220"
            stroke={`url(#${gradMain})`}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="40.5" cy="34.5" r="1.6" fill={secondary} />
        </g>
      );

    case 'countora':
      // Modern segmented countdown ring
      return (
        <g>
          {/* Segmented outer arcs */}
          <path
            d="M32 14A18 18 0 0 1 49.1 26.4"
            stroke={secondary}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M49.5 34.5A18 18 0 0 1 34.5 49.8"
            stroke={primary}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M26.5 49.1A18 18 0 0 1 14.5 28"
            stroke={secondary}
            strokeOpacity="0.65"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M16.4 22.8A18 18 0 0 1 26 15"
            stroke={primary}
            strokeOpacity="0.35"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Inner ring & numeric pulse */}
          <circle
            cx="32"
            cy="32"
            r="9.5"
            fill={`url(#${gradMain})`}
            fillOpacity="0.2"
            stroke={`url(#${gradMain})`}
            strokeWidth="1.8"
          />
          <path
            d="M32 26.5V32L36 34.5"
            stroke="#F5F7FA"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );

    case 'gymtika':
      // Geometric dumbbell + rep counter pulse
      return (
        <g>
          {/* Left weights */}
          <rect
            x="13"
            y="22"
            width="5"
            height="20"
            rx="2.5"
            fill={`url(#${gradMain})`}
          />
          <rect
            x="19.5"
            y="18"
            width="5"
            height="28"
            rx="2.5"
            fill={secondary}
          />
          {/* Right weights */}
          <rect
            x="39.5"
            y="18"
            width="5"
            height="28"
            rx="2.5"
            fill={secondary}
          />
          <rect
            x="46"
            y="22"
            width="5"
            height="20"
            rx="2.5"
            fill={`url(#${gradMain})`}
          />
          {/* Center bar */}
          <path
            d="M24.5 32H39.5"
            stroke="#F5F7FA"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Rep counter pulse */}
          <path
            d="M22 49H27L29.5 44L33 52L35.5 47H42"
            stroke={secondary}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );

    case 'gardenova':
      // Botanical leaf + water drop
      return (
        <g>
          {/* Botanical leaf */}
          <path
            d="M17 44C17 27 28 17 45 17C45 34 35 45 18 45"
            fill={`url(#${gradMain})`}
            fillOpacity="0.22"
            stroke={`url(#${gradMain})`}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Leaf vein */}
          <path
            d="M17 45C24 38 31 30 39 23"
            stroke={secondary}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Water drop */}
          <path
            d="M42.5 32C42.5 32 48.5 38.4 48.5 42.5C48.5 45.81 45.81 48.5 42.5 48.5C39.19 48.5 36.5 45.81 36.5 42.5C36.5 38.4 42.5 32 42.5 32Z"
            fill="#0B1220"
            stroke={secondary}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
      );

    case 'alanya-adventure':
      // Stylized Alanya castle tower silhouette + 3D compass star
      return (
        <g>
          {/* Red Tower (Kizil Kule) inspired octagonal tower silhouette */}
          <path
            d="M16 48V25H19V22H23V25H26V22H30V25H34V22H38V25H41V48H16Z"
            fill={`url(#${gradMain})`}
            fillOpacity="0.2"
            stroke={`url(#${gradMain})`}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Tower battlements & arch */}
          <path
            d="M25 48V38C25 35.79 26.79 34 29 34C31.21 34 33 35.79 33 38V48"
            stroke={secondary}
            strokeWidth="2"
          />
          {/* 3D Compass Star */}
          <path
            d="M44 13L46.3 19.7L53 22L46.3 24.3L44 31L41.7 24.3L35 22L41.7 19.7L44 13Z"
            fill={`url(#${gradMain})`}
            stroke="#F5F7FA"
            strokeOpacity="0.8"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>
      );

    default:
      return (
        <g>
          <circle
            cx="32"
            cy="32"
            r="14"
            fill={`url(#${gradMain})`}
            fillOpacity="0.2"
            stroke={`url(#${gradMain})`}
            strokeWidth="2.4"
          />
          <circle cx="32" cy="32" r="5" fill={secondary} />
        </g>
      );
  }
}
