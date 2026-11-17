import type { Locale } from '@/types/project';

export const locales = ['en', 'tr', 'de', 'es', 'ar'] as const;

export const defaultLocale: Locale = 'en';

export const rtlLocales: Locale[] = ['ar'];

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export const localeNames: Record<
  Locale,
  { name: string; nativeName: string; flag: string }
> = {
  en: { name: 'English', nativeName: 'English', flag: '🇬🇧' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
};
