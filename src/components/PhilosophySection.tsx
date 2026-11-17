import { Compass, Layers, ShieldCheck } from 'lucide-react';
import type { Dictionary, PhilosophyItem } from '@/i18n/dictionaries/types';

export interface PhilosophySectionProps {
  dict: Dictionary;
}

const PHILOSOPHY_ICONS: Record<PhilosophyItem['key'], typeof Layers> = {
  simplicity: Layers,
  practicality: Compass,
  quality: ShieldCheck,
};

export function PhilosophySection({ dict }: PhilosophySectionProps) {
  return (
    <section aria-labelledby="philosophy-heading" className="space-y-8">
      <div className="max-w-2xl space-y-2">
        <h2
          id="philosophy-heading"
          className="text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl"
        >
          {dict.philosophy.title}
        </h2>
        <p className="text-base leading-relaxed text-text-secondary">
          {dict.philosophy.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {dict.philosophy.items.map((item) => {
          const Icon = PHILOSOPHY_ICONS[item.key];
          return (
            <article
              key={item.key}
              className="rounded-2xl border border-border-subtle bg-surface-card p-6 transition-all duration-200 hover:border-border-strong"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-electric-blue/25 bg-electric-blue/10 text-electric-blue">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-sm font-semibold tracking-wider text-text-primary">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
