import { defaultLocale, isValidLocale } from './config';
import type { Dictionary } from './dictionaries/types';
import { en } from './dictionaries/en';
import { tr } from './dictionaries/tr';
import { de } from './dictionaries/de';
import { es } from './dictionaries/es';
import { ar } from './dictionaries/ar';
import type { Locale } from '@/types/project';

const dictionaries: Record<Locale, Dictionary> = {
  en,
  tr,
  de,
  es,
  ar,
};

export function getDictionary(locale: Locale | string): Dictionary {
  if (isValidLocale(locale)) {
    return dictionaries[locale];
  }
  return dictionaries[defaultLocale];
}

export type { Dictionary } from './dictionaries/types';
