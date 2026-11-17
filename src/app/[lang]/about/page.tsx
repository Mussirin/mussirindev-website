import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Github,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { PhilosophySection } from '@/components/PhilosophySection';
import { TechStackSection } from '@/components/TechStackSection';
import { isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { buildPageMetadata, getSiteUrl } from '@/lib/seo';

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
    path: '/about',
    title: dict.meta.pages.about.title,
    description: dict.meta.pages.about.description,
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const siteUrl = getSiteUrl();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mustafa Sirin',
    url: `${siteUrl}/${lang}/about`,
    email: 'mailto:mustafasirin42@gmail.com',
    telephone: '+905388153048',
    jobTitle: 'Independent Mobile App Developer',
    worksFor: {
      '@type': 'Brand',
      name: 'mussirindev',
      url: siteUrl,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR',
    },
    sameAs: ['https://github.com/Mussirin'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Main Story */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center rounded-full border border-[var(--electric-blue)]/30 bg-[var(--electric-blue)]/10 px-3.5 py-1 text-xs font-semibold text-[#1D74D8] dark:text-[var(--cyan-accent)]">
              mussirindev
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
              {dict.about.title}
            </h1>

            <div className="mt-6 space-y-5 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {dict.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {dict.about.highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-3"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-[var(--electric-blue)]"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${lang}/projects`}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--electric-blue)] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                <span>{dict.hero.primaryCta}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-card)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--electric-blue)]/50"
              >
                <span>{dict.nav.getInTouch}</span>
              </Link>
            </div>
          </div>

          {/* Founder / Studio Info Card */}
          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {dict.contact.infoTitle}
              </h2>

              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--electric-blue)]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[var(--text-muted)]">
                      {dict.contact.nameLabel} · {dict.contact.locationLabel}
                    </dt>
                    <dd className="mt-0.5 font-semibold text-[var(--text-primary)]">
                      Mustafa Sirin · {dict.contact.locationValue}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--electric-blue)]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[var(--text-muted)]">
                      {dict.contact.emailLabel}
                    </dt>
                    <dd className="mt-0.5">
                      <a
                        href="mailto:mustafasirin42@gmail.com"
                        className="font-semibold text-[var(--text-primary)] transition hover:text-[var(--electric-blue)]"
                      >
                        mustafasirin42@gmail.com
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--electric-blue)]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[var(--text-muted)]">
                      {dict.contact.phoneLabel}
                    </dt>
                    <dd className="mt-0.5">
                      <a
                        href="tel:+905388153048"
                        className="font-semibold text-[var(--text-primary)] transition hover:text-[var(--electric-blue)]"
                        dir="ltr"
                      >
                        +90 538 8153048
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Github
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--electric-blue)]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-medium text-[var(--text-muted)]">
                      {dict.contact.githubLabel}
                    </dt>
                    <dd className="mt-0.5">
                      <a
                        href="https://github.com/Mussirin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--text-primary)] transition hover:text-[var(--electric-blue)]"
                      >
                        github.com/Mussirin
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <PhilosophySection dict={dict} />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <TechStackSection dict={dict} />
      </div>
    </>
  );
}
