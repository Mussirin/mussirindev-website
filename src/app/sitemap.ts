import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/data/projects';
import { locales } from '@/i18n/config';
import { getSiteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

const STATIC_ROUTES = [
  '',
  '/projects',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const projects = getAllProjects();
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${siteUrl}/${locale}${route}`,
        lastModified,
        changeFrequency: route === '' || route === '/projects' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/projects' ? 0.9 : 0.7,
      });
    }

    for (const project of projects) {
      entries.push({
        url: `${siteUrl}/${locale}/projects/${project.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
