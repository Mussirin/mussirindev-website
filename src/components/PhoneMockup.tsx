'use client';

import { useState } from 'react';
import { ProjectIcon } from './ProjectIcon';

export interface MockupScreenItem {
  label: string;
  value?: string;
  detail?: string;
  done?: boolean;
}

export interface MockupScreen {
  title: string;
  subtitle?: string;
  badge?: string;
  metric?: string;
  metricLabel?: string;
  progress?: number;
  items?: Array<string | MockupScreenItem>;
}

export interface PhoneMockupProps {
  slug: string;
  appName: string;
  accentColor?: string;
  secondaryColor?: string;
  mockupScreens?: MockupScreen[];
  className?: string;
}

function normalizeItem(item: string | MockupScreenItem): MockupScreenItem {
  if (typeof item === 'string') {
    return { label: item };
  }
  return item;
}

function getDefaultMetric(slug: string): { metric: string; label: string; progress: number } {
  switch (slug) {
    case 'packora':
      return { metric: '14 / 16', label: 'Packed Items', progress: 88 };
    case 'testitime':
      return { metric: '42:18', label: 'Remaining', progress: 72 };
    case 'bawul':
      return { metric: '3 Days', label: 'Trip Itinerary', progress: 65 };
    case 'yasselim':
      return { metric: '12 Entries', label: 'Quiet Reflection', progress: 80 };
    case 'countora':
      return { metric: '08d 14h', label: 'Countdown', progress: 76 };
    case 'gymtika':
      return { metric: '4 × 12', label: 'Active Sets', progress: 75 };
    case 'gardenova':
      return { metric: '68%', label: 'Soil Moisture', progress: 68 };
    case 'alanya-adventure':
      return { metric: '4 / 7', label: 'Landmarks', progress: 57 };
    default:
      return { metric: 'Active', label: 'Overview', progress: 70 };
  }
}

export function PhoneMockup({
  slug,
  appName,
  accentColor = '#3B9EFF',
  secondaryColor = '#62C8FF',
  mockupScreens,
  className = '',
}: PhoneMockupProps) {
  const screens: MockupScreen[] =
    mockupScreens && mockupScreens.length > 0
      ? mockupScreens
      : [
          {
            title: appName,
            subtitle: 'Overview',
            items: ['Clean interface', 'Focused workflow', 'Offline ready'],
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = activeIndex < screens.length ? activeIndex : 0;
  const activeScreen = screens[safeIndex];

  const defaults = getDefaultMetric(slug);
  const displayMetric = activeScreen.metric ?? defaults.metric;
  const displayMetricLabel = activeScreen.metricLabel ?? defaults.label;
  const displayProgress =
    typeof activeScreen.progress === 'number'
      ? Math.max(0, Math.min(100, activeScreen.progress))
      : defaults.progress;

  const items = (activeScreen.items ?? []).slice(0, 4).map(normalizeItem);

  return (
    <div className={`inline-flex flex-col items-center ${className}`.trim()}>
      {/* Outer sleek device frame */}
      <div
        className="relative w-[276px] sm:w-[292px] rounded-[42px] p-[10px] shadow-2xl select-none"
        style={{
          background:
            'linear-gradient(145deg, rgba(38, 54, 84, 0.95), rgba(11, 18, 32, 0.98))',
          boxShadow: `0 24px 60px -16px rgba(5, 10, 22, 0.75), 0 0 0 1px rgba(98, 200, 255, 0.16)`,
        }}
      >
        {/* Subtle hardware side buttons */}
        <span
          aria-hidden="true"
          className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l-full bg-slate-600/70"
        />
        <span
          aria-hidden="true"
          className="absolute -left-[3px] top-36 h-11 w-[3px] rounded-l-full bg-slate-600/70"
        />
        <span
          aria-hidden="true"
          className="absolute -right-[3px] top-28 h-14 w-[3px] rounded-r-full bg-slate-600/70"
        />

        {/* Inner screen */}
        <div
          className="relative overflow-hidden rounded-[33px] bg-[#0B1220] text-[#F5F7FA] flex flex-col min-h-[500px]"
          style={{
            backgroundImage: `radial-gradient(circle at 85% 8%, ${accentColor}22 0%, transparent 48%), radial-gradient(circle at 12% 92%, ${secondaryColor}18 0%, transparent 45%)`,
          }}
        >
          {/* Realistic Status Bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-2 text-[11px] font-medium text-slate-200">
            <span>9:41</span>
            {/* Dynamic Island Pill */}
            <div
              aria-hidden="true"
              className="h-4 w-20 rounded-full bg-black/90 border border-white/10 flex items-center justify-end pr-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
            </div>
            {/* Signal + Wifi + Battery */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                <rect x="0.5" y="6" width="2" height="3.5" rx="0.6" fill="currentColor" />
                <rect x="3.5" y="4" width="2" height="5.5" rx="0.6" fill="currentColor" />
                <rect x="6.5" y="2" width="2" height="7.5" rx="0.6" fill="currentColor" />
                <rect x="9.5" y="0.5" width="2" height="9" rx="0.6" fill="currentColor" opacity="0.4" />
              </svg>
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                <rect
                  x="0.5"
                  y="1"
                  width="14.5"
                  height="8"
                  rx="2"
                  stroke="currentColor"
                  strokeOpacity="0.55"
                />
                <rect x="2" y="2.5" width="10.5" height="5" rx="1" fill="currentColor" />
                <path
                  d="M16 3.5V6.5"
                  stroke="currentColor"
                  strokeOpacity="0.6"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* App Header */}
          <div className="px-4 pt-2 pb-3 flex items-center justify-between border-b border-white/8">
            <div className="flex items-center gap-2.5 min-w-0">
              <ProjectIcon
                slug={slug}
                accentColor={accentColor}
                secondaryColor={secondaryColor}
                size={30}
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-tight text-white truncate">
                  {appName}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {activeScreen.title}
                </p>
              </div>
            </div>
            {activeScreen.badge ? (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0"
                style={{
                  backgroundColor: `${accentColor}22`,
                  color: secondaryColor,
                  border: `1px solid ${accentColor}44`,
                }}
              >
                {activeScreen.badge}
              </span>
            ) : (
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: secondaryColor }}
              />
            )}
          </div>

          {/* Main Screen Body */}
          <div className="flex-1 p-4 flex flex-col gap-3">
            {/* Hero / Metric Card tailored by app type */}
            {renderHeroWidget({
              slug,
              metric: displayMetric,
              metricLabel: displayMetricLabel,
              progress: displayProgress,
              subtitle: activeScreen.subtitle,
              accentColor,
              secondaryColor,
            })}

            {/* Stylized UI List / Cards */}
            <div className="flex flex-col gap-2">
              {items.map((item, idx) => (
                <div
                  key={`${item.label}-${idx}`}
                  className="rounded-xl px-3 py-2.5 bg-[#121E35]/90 border border-white/8 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {renderItemIndicator(slug, idx, item.done, accentColor, secondaryColor)}
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-slate-100 truncate">
                        {item.label}
                      </p>
                      {item.detail && (
                        <p className="text-[10px] text-slate-400 truncate">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </div>
                  {item.value && (
                    <span
                      className="text-[10px] font-semibold shrink-0"
                      style={{ color: secondaryColor }}
                    >
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Home Indicator / Screen Switcher */}
          <div className="px-4 pb-3 pt-1 flex flex-col items-center gap-2">
            {screens.length > 1 && (
              <div
                className="flex items-center gap-1.5"
                role="tablist"
                aria-label={`${appName} screen previews`}
              >
                {screens.map((scr, idx) => {
                  const isActive = idx === safeIndex;
                  return (
                    <button
                      key={`${scr.title}-${idx}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`View ${scr.title}`}
                      onClick={() => setActiveIndex(idx)}
                      className="h-1.5 rounded-full transition-all cursor-pointer"
                      style={{
                        width: isActive ? 18 : 6,
                        backgroundColor: isActive
                          ? secondaryColor
                          : 'rgba(167, 179, 196, 0.35)',
                      }}
                    />
                  );
                })}
              </div>
            )}
            <div
              aria-hidden="true"
              className="h-1 w-24 rounded-full bg-white/25"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function renderHeroWidget({
  slug,
  metric,
  metricLabel,
  progress,
  subtitle,
  accentColor,
  secondaryColor,
}: {
  slug: string;
  metric: string;
  metricLabel: string;
  progress: number;
  subtitle?: string;
  accentColor: string;
  secondaryColor: string;
}) {
  // Circular ring apps (testitime, countora)
  if (slug === 'testitime' || slug === 'countora') {
    const radius = 26;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <div className="rounded-2xl p-3.5 bg-[#121E35]/95 border border-white/10 flex items-center gap-3.5">
        <svg width="64" height="64" viewBox="0 0 64 64" className="shrink-0">
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="5"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke={secondaryColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 32 32)"
          />
          <text
            x="32"
            y="35"
            textAnchor="middle"
            fill="#F5F7FA"
            fontSize="10"
            fontWeight="600"
          >
            {progress}%
          </text>
        </svg>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">
            {metricLabel}
          </p>
          <p className="text-lg font-bold tracking-tight text-white">
            {metric}
          </p>
          {subtitle && (
            <p className="text-[10px] text-slate-400 truncate">{subtitle}</p>
          )}
        </div>
      </div>
    );
  }

  // Pulse / workout bar chart (gymtika)
  if (slug === 'gymtika') {
    const bars = [48, 72, 60, 88, 76, 94, 68];
    return (
      <div className="rounded-2xl p-3.5 bg-[#121E35]/95 border border-white/10">
        <div className="flex items-baseline justify-between mb-2.5">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">
              {metricLabel}
            </p>
            <p className="text-base font-bold text-white">{metric}</p>
          </div>
          {subtitle && (
            <span className="text-[10px] text-slate-400 truncate max-w-[110px]">
              {subtitle}
            </span>
          )}
        </div>
        <div className="flex items-end gap-1.5 h-10">
          {bars.map((height, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${height}%`,
                background:
                  idx === 5
                    ? secondaryColor
                    : `linear-gradient(to top, ${accentColor}55, ${secondaryColor}99)`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default progress card (packora, bawul, yasselim, gardenova, alanya-adventure)
  return (
    <div className="rounded-2xl p-3.5 bg-[#121E35]/95 border border-white/10">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[10px] uppercase tracking-wider text-slate-400 truncate">
          {metricLabel}
        </p>
        <span
          className="text-[10px] font-semibold"
          style={{ color: secondaryColor }}
        >
          {progress}%
        </span>
      </div>
      <p className="text-lg font-bold tracking-tight text-white mt-0.5">
        {metric}
      </p>
      {subtitle && (
        <p className="text-[10px] text-slate-400 truncate mt-0.5">{subtitle}</p>
      )}
      <div className="mt-2.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${accentColor}, ${secondaryColor})`,
          }}
        />
      </div>
    </div>
  );
}

function renderItemIndicator(
  slug: string,
  index: number,
  done: boolean | undefined,
  accentColor: string,
  secondaryColor: string
) {
  const isChecked = done ?? index < 2;

  if (slug === 'packora' || slug === 'bawul') {
    return (
      <span
        aria-hidden="true"
        className="h-4 w-4 rounded-md flex items-center justify-center shrink-0 border"
        style={{
          backgroundColor: isChecked ? `${accentColor}30` : 'transparent',
          borderColor: isChecked ? secondaryColor : 'rgba(255,255,255,0.2)',
        }}
      >
        {isChecked && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.2L5 8.7L9.5 3.5"
              stroke={secondaryColor}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="h-2.5 w-2.5 rounded-full shrink-0"
      style={{
        backgroundColor: index === 0 ? secondaryColor : accentColor,
        opacity: index === 0 ? 1 : 0.65,
      }}
    />
  );
}
