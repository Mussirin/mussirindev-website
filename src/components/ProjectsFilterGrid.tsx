'use client';

import { useMemo, useState } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import type { Dictionary } from '@/i18n/dictionaries/types';
import type { Locale, Project } from '@/types/project';

export interface ProjectsFilterGridProps {
  projects: Project[];
  lang: Locale;
  dict: Dictionary;
}

export function ProjectsFilterGrid({
  projects,
  lang,
  dict,
}: ProjectsFilterGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    for (const project of projects) {
      if (!map.has(project.categoryKey)) {
        map.set(project.categoryKey, project.category[lang]);
      }
    }
    return Array.from(map.entries()).map(([key, label]) => ({ key, label }));
  }, [projects, lang]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter((p) => p.categoryKey === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Category Filter Bar */}
      <div
        role="tablist"
        aria-label={dict.projectsSection.title}
        className="flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue ${
            selectedCategory === 'all'
              ? 'bg-electric-blue text-white shadow-xs'
              : 'border border-border-subtle bg-surface-card text-text-secondary hover:border-border-strong hover:text-text-primary'
          }`}
        >
          {dict.projectsSection.allCategories} ({projects.length})
        </button>

        {categories.map((cat) => {
          const active = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(cat.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue ${
                active
                  ? 'bg-electric-blue text-white shadow-xs'
                  : 'border border-border-subtle bg-surface-card text-text-secondary hover:border-border-strong hover:text-text-primary'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            lang={lang}
            dict={dict}
          />
        ))}
      </div>
    </div>
  );
}
