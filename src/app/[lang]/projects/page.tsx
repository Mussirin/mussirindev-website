import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectsFilterGrid } from '@/components/ProjectsFilterGrid';
import { getAllProjects } from '@/data/projects';
import { isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};

  const dict = getDictionary(lang);
  return buildPageMetadata({
    lang,
    path: '/projects',
    title: dict.meta.pages.projects.title,
    description: dict.meta.pages.projects.description,
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const projects = getAllProjects();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
          {dict.projectsSection.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
          {dict.projectsSection.subtitle}
        </p>
      </div>

      <div className="mt-10">
        <ProjectsFilterGrid projects={projects} lang={lang} dict={dict} />
      </div>
    </section>
  );
}
