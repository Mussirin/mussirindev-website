import type { MockupScreen as PhoneMockupScreen } from '@/components/PhoneMockup';
import type { Locale, Project } from '@/types/project';

/**
 * Converts a Project's localized mockupScreens into plain strings for PhoneMockup.
 */
export function localizeMockupScreens(
  project: Project,
  lang: Locale
): PhoneMockupScreen[] {
  return project.mockupScreens.map((screen) => ({
    title: screen.title[lang],
    subtitle: screen.subtitle[lang],
    items: screen.items[lang],
  }));
}
