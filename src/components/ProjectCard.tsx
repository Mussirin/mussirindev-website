import Link from 'next/link';
import { ArrowRight, ExternalLink, Smartphone } from 'lucide-react';
import { ProjectIcon } from '@/components/ProjectIcon';
import type { Dictionary } from '@/i18n/dictionaries/types';
import type { Locale, Project, ProjectStatus } from '@/types/project';

export interface ProjectCardProps {
  project: Project;
  lang: Locale;
  dict: Dictionary;
}

const STATUS_BADGE_STYLES: Record<ProjectStatus, string> = {
  available:
    'border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'in-development':
    'border-electric-blue/25 bg-electric-blue/10 text-electric-blue',
  'coming-soon':
    'border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400',
};

const STATUS_DOT_STYLES: Record<ProjectStatus, string> = {
  available: 'bg-emerald-500',
  'in-development': 'bg-electric-blue',
  'coming-soon': 'bg-amber-500',
};

export function ProjectCard({ project, lang, dict }: ProjectCardProps) {
  const statusLabel = dict.projectsSection.statusLabels[project.status];
  const hasStoreLinks = Boolean(project.googlePlayUrl || project.appStoreUrl);

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-border-subtle bg-surface-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg">
      <div>
        {/* Top Row: Icon + Status Badge */}
        <div className="flex items-start justify-between gap-4">
          <ProjectIcon
            slug={project.slug}
            accentColor={project.accentColor}
            secondaryColor={project.secondaryColor}
            size={56}
            title={project.name}
            className="shrink-0 transition-transform duration-300 group-hover:scale-105"
          />

          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_BADGE_STYLES[project.status]}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT_STYLES[project.status]}`}
              aria-hidden="true"
            />
            {statusLabel}
          </span>
        </div>

        {/* Title & Category */}
        <div className="mt-5">
          <p className="text-xs font-medium uppercase tracking-wider text-electric-blue">
            {project.category[lang]}
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-text-primary">
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-text-secondary">
          {project.description[lang]}
        </p>

        {/* Platforms */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {project.platforms.map((platform) => (
            <span
              key={platform}
              className="inline-flex items-center gap-1 rounded-md border border-border-subtle bg-surface-secondary/70 px-2 py-0.5 text-xs font-medium text-text-muted"
            >
              <Smartphone className="h-3 w-3" aria-hidden="true" />
              {platform}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
        <Link
          href={`/${lang}/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-electric-blue transition-colors hover:text-cyan-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue"
        >
          <span>{dict.projectsSection.viewDetails}</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
        </Link>

        {hasStoreLinks && (
          <div className="flex items-center gap-2">
            {project.googlePlayUrl && (
              <a
                href={project.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-border-subtle bg-surface-secondary px-2.5 py-1 text-xs font-medium text-text-primary transition-colors hover:border-border-strong"
              >
                <span>Google Play</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            )}
            {project.appStoreUrl && (
              <a
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-border-subtle bg-surface-secondary px-2.5 py-1 text-xs font-medium text-text-primary transition-colors hover:border-border-strong"
              >
                <span>App Store</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
