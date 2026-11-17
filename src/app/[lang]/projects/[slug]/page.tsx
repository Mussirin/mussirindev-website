import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Globe,
  Info,
  Smartphone,
} from 'lucide-react';
import { PhoneMockup } from '@/components/PhoneMockup';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectIcon } from '@/components/ProjectIcon';
import {
  getAllProjects,
  getProjectBySlug,
  getRelatedProjects,
} from '@/data/projects';
import { isValidLocale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { localizeMockupScreens } from '@/lib/mockup';
import { buildPageMetadata } from '@/lib/seo';

export function generateStaticParams() {
  const allProjects = getAllProjects();
  return locales.flatMap((lang) =>
    allProjects.map((project) => ({
      lang,
      slug: project.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return {};

  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildPageMetadata({
    lang,
    path: `/projects/${project.slug}`,
    title: `${project.name} — mussirindev`,
    description: project.description[lang],
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  const dict = getDictionary(lang);
  const relatedProjects = getRelatedProjects(slug, 3);
  const statusLabel = dict.projectsSection.statusLabels[project.status];
  const hasStoreLinks = Boolean(project.googlePlayUrl || project.appStoreUrl);

  const statusStyles =
    project.status === 'available'
      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
      : project.status === 'coming-soon'
        ? 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
        : 'border-[var(--electric-blue)]/30 bg-[var(--electric-blue)]/10 text-[#1D74D8] dark:text-[var(--cyan-accent)]';

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Back link */}
      <Link
        href={`/${lang}/projects`}
        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-primary)]"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        <span>{dict.projectsSection.backToProjects}</span>
      </Link>

      {/* Hero Presentation */}
      <div className="mt-8 grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-4">
            <ProjectIcon
              slug={project.slug}
              accentColor={project.accentColor}
              secondaryColor={project.secondaryColor}
              size={76}
              title={project.name}
            />
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  {project.category[lang]}
                </span>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyles}`}
                >
                  {statusLabel}
                </span>
              </div>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
                {project.name}
              </h1>
            </div>
          </div>

          <p className="mt-6 text-xl font-medium leading-relaxed text-[var(--text-primary)]">
            {project.tagline[lang]}
          </p>

          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
            {project.longDescription[lang]}
          </p>

          {/* Editable Concept Note (e.g., BAWUL) */}
          {project.editableNote && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-200">
              <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold">
                  {dict.projectsSection.editableNotice}
                </p>
                <p className="mt-1 leading-relaxed opacity-90">
                  {project.editableNote[lang]}
                </p>
              </div>
            </div>
          )}

          {/* Platforms & Languages */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                <Smartphone className="h-4 w-4 text-[var(--electric-blue)]" aria-hidden="true" />
                <span>{dict.projectsSection.platformsLabel}</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {project.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="rounded-lg bg-[var(--surface-secondary)] px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)]"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                <Globe className="h-4 w-4 text-[var(--electric-blue)]" aria-hidden="true" />
                <span>{dict.projectsSection.languagesLabel}</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {project.languages.map((code) => (
                  <span
                    key={code}
                    className="rounded-lg bg-[var(--surface-secondary)] px-2.5 py-1 font-mono text-xs font-semibold text-[var(--text-primary)]"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Store Links or Coming Soon Note */}
          <div className="mt-6">
            {hasStoreLinks ? (
              <div className="flex flex-wrap gap-3">
                {project.googlePlayUrl && (
                  <a
                    href={project.googlePlayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--electric-blue)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    <span>Google Play</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
                {project.appStoreUrl && (
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-card)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--electric-blue)]/50"
                  >
                    <span>App Store</span>
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)]/70 px-4 py-3 text-sm text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">
                  {statusLabel}:
                </span>{' '}
                {dict.projectsSection.storeComingSoonNote}
              </div>
            )}
          </div>
        </div>

        {/* Interactive PhoneMockup Gallery */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 sm:p-8">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              {dict.projectsSection.galleryLabel}
            </p>
            <div className="mx-auto max-w-[270px]">
              <PhoneMockup
                slug={project.slug}
                appName={project.name}
                accentColor={project.accentColor}
                secondaryColor={project.secondaryColor}
                mockupScreens={localizeMockupScreens(project, lang)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <section className="mt-16 rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 sm:p-10">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          {dict.projectsSection.featuresLabel}
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {project.features[lang].map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-bg)] p-4"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-[var(--electric-blue)]"
                aria-hidden="true"
              />
              <span className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {dict.projectsSection.relatedLabel}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((related) => (
              <ProjectCard
                key={related.slug}
                project={related}
                lang={lang}
                dict={dict}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
