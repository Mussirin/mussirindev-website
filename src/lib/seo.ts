import type { Metadata } from 'next';
import { defaultLocale, locales } from '@/i18n/config';
import type { Locale } from '@/types/project';

const DEFAULT_SITE_URL = 'https://mussirindev.com';

const OG_LOCALE_MAP: Record<Locale, string> = {
  en: 'en_US',
  tr: 'tr_TR',
  de: 'de_DE',
  es: 'es_ES',
  ar: 'ar_SA',
};

/**
 * Returns the canonical site base URL without a trailing slash.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, '');
}

function normalizePath(path: string): string {
  if (!path || path === '/') {
    return '';
  }
  return path.startsWith('/') ? path : `/${path}`;
}

export interface BuildPageMetadataOptions {
  lang: Locale;
  path: string;
  title: string;
  description: string;
}

/**
 * Builds localized Next.js Metadata with canonical, hreflang alternates,
 * Open Graph, and Twitter card fields.
 */
export function buildPageMetadata({
  lang,
  path,
  title,
  description,
}: BuildPageMetadataOptions): Metadata {
  const siteUrl = getSiteUrl();
  const normalizedPath = normalizePath(path);
  const canonicalUrl = `${siteUrl}/${lang}${normalizedPath}`;

  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${siteUrl}/${locale}${normalizedPath}`;
  }
  languages['x-default'] = `${siteUrl}/${defaultLocale}${normalizedPath}`;

  const ogImageUrl = `${siteUrl}/images/hero-artwork.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'mussirindev',
      locale: OG_LOCALE_MAP[lang],
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
