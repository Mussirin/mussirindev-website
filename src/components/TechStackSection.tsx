import {
  Apple,
  Bot,
  Code2,
  Cpu,
  GitBranch,
  Github,
  Globe,
  Smartphone,
  Terminal,
} from 'lucide-react';
import type { Dictionary } from '@/i18n/dictionaries/types';

export interface TechStackSectionProps {
  dict: Dictionary;
}

const TECH_ITEMS = [
  {
    name: 'Flutter',
    category: 'Cross-Platform UI',
    icon: Smartphone,
    accent: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  },
  {
    name: 'Dart',
    category: 'App Language',
    icon: Code2,
    accent: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
  },
  {
    name: 'Android',
    category: 'Mobile Platform',
    icon: Cpu,
    accent: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    name: 'iOS',
    category: 'Mobile Platform',
    icon: Apple,
    accent: 'text-slate-600 dark:text-slate-300 bg-slate-500/10 border-slate-500/20',
  },
  {
    name: 'Git',
    category: 'Version Control',
    icon: GitBranch,
    accent: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
  },
  {
    name: 'GitHub',
    category: 'Code Hosting',
    icon: Github,
    accent: 'text-text-primary bg-surface-secondary border-border-strong',
  },
  {
    name: 'TypeScript',
    category: 'Web & Tooling',
    icon: Terminal,
    accent: 'text-electric-blue bg-electric-blue/10 border-electric-blue/20',
  },
  {
    name: 'Next.js',
    category: 'Web Framework',
    icon: Globe,
    accent: 'text-text-primary bg-surface-secondary border-border-strong',
  },
  {
    name: 'AI-Assisted Development',
    category: 'Workflow',
    icon: Bot,
    accent: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
  },
] as const;

export function TechStackSection({ dict }: TechStackSectionProps) {
  return (
    <section aria-labelledby="tech-stack-heading" className="space-y-8">
      <div className="max-w-2xl space-y-2">
        <h2
          id="tech-stack-heading"
          className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl"
        >
          {dict.about.techStackTitle}
        </h2>
        <p className="text-base leading-relaxed text-text-secondary">
          {dict.about.techStackSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TECH_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="flex items-center gap-4 rounded-2xl border border-border-subtle bg-surface-card p-4 transition-colors hover:border-border-strong"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${item.accent}`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-text-primary">
                  {item.name}
                </h3>
                <p className="truncate text-xs text-text-muted">
                  {item.category}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
