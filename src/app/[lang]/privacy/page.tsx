import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
    path: '/privacy',
    title: dict.meta.pages.privacy.title,
    description: dict.meta.pages.privacy.description,
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const { privacy } = dict.legal;

  return (
    <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <header className="border-b border-[var(--border-subtle)] pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          {privacy.title}
        </h1>
        <p className="mt-3 text-sm font-medium text-[var(--text-muted)]">
          {privacy.updatedAt}
        </p>
      </header>

      <div className="mt-10 space-y-8">
        {privacy.sections.map((section) => (
          <section
            key={section.heading}
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6"
          >
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              {section.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
