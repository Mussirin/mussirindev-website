export type Locale = 'en' | 'tr' | 'de' | 'es' | 'ar';

export type ProjectStatus = 'in-development' | 'coming-soon' | 'available';

export type Platform = 'Android' | 'iOS' | 'Cross-Platform';

export type LocalizedText = Record<Locale, string>;

export type LocalizedList = Record<Locale, string[]>;

export interface MockupScreen {
  title: LocalizedText;
  subtitle: LocalizedText;
  items: LocalizedList;
}

export interface Project {
  slug: string;
  name: string;
  categoryKey: string;
  category: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  longDescription: LocalizedText;
  features: LocalizedList;
  status: ProjectStatus;
  platforms: Platform[];
  languages: string[];
  accentColor: string;
  secondaryColor: string;
  mockupScreens: MockupScreen[];
  googlePlayUrl?: string;
  appStoreUrl?: string;
  editableNote?: LocalizedText;
}
