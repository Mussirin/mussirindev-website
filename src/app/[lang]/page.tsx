import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Code2, Compass, MapPin, Sparkles } from 'lucide-react';
import { PhilosophySection } from '@/components/PhilosophySection';
import { PhoneMockup } from '@/components/PhoneMockup';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectIcon } from '@/components/ProjectIcon';
import { TechStackSection } from '@/components/TechStackSection';
import { getAllProjects, getProjectBySlug } from '@/data/projects';
import { isValidLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { localizeMockupScreens } from '@/lib/mockup';
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
    path: '/',
    title: dict.meta.pages.home.title,
    description: dict.meta.pages.home.description,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.slice(0, 6);
  const packora = getProjectBySlug('packora') ?? allProjects[0];
  const testitime = getProjectBySlug('testitime') ?? allProjects[1];
  const siteUrl = getSiteUrl();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'mussirindev',
    url: siteUrl,
    email: 'mailto:mustafasirin42@gmail.com',
    founder: {
      '@type': 'Person',
      name: 'Mustafa Sirin',
      jobTitle: 'Independent Mobile App Developer',
      nationality: 'Türkiye',
    },
    sameAs: ['https://github.com/Mussirin'],
  };

  const factIcons = [Compass, MapPin, Code2];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-gradient-to-br from-[#F5F7FA] via-[#EAF3FF] to-[#DFEEFF] dark:from-[#0B1220] dark:via-[#101B30] dark:to-[#0B1220]">
        {/* Dark-mode atmospheric hero artwork */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden dark:block"
        >
          <img
            src="/images/hero-artwork.jpg"
            alt=""
            className="h-full w-full object-cover object-center opacity-25 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/70 via-[#101B30]/75 to-[#0B1220]" />
        </div>

        {/* Subtle ambient radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-[var(--electric-blue)]/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Left Column */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--electric-blue)]/30 bg-[var(--electric-blue)]/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#1D74D8] dark:text-[var(--cyan-accent)]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{dict.hero.badge}</span>
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
                {dict.hero.mainHeading}
              </h1>

              <p className="mt-3 text-xl font-semibold tracking-tight text-[#1D74D8] dark:text-[var(--cyan-accent)] sm:text-2xl">
                {dict.hero.secondaryHeading}
              </p>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                {dict.hero.description}
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${lang}/projects`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--electric-blue)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--electric-blue)]/25 transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--electric-blue)]"
                >
                  <span>{dict.hero.primaryCta}</span>
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
                </Link>

                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-card)]/80 px-6 py-3.5 text-sm font-semibold text-[var(--text-primary)] backdrop-blur-sm transition hover:border-[var(--electric-blue)]/50 hover:bg-[var(--surface-card)]"
                >
                  <span>{dict.hero.secondaryCta}</span>
                </Link>
              </div>

              {/* Factual Studio Pills */}
              <div className="mt-10 flex flex-wrap items-center gap-3">
                {dict.hero.studioFacts.map((fact, index) => {
                  const Icon = factIcons[index] ?? Compass;
                  return (
                    <div
                      key={fact}
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)]/75 px-3.5 py-2 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-sm"
                    >
                      <Icon
                        className="h-3.5 w-3.5 text-[var(--electric-blue)]"
                        aria-hidden="true"
                      />
                      <span>{fact}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Original PhoneMockup Showcase */}
            <div className="relative lg:col-span-6">
              <div className="relative mx-auto flex max-w-xl items-center justify-center">
                {/* Soft backdrop ring */}
                <div
                  aria-hidden="true"
                  className="absolute inset-4 rounded-full bg-gradient-to-tr from-[var(--electric-blue)]/20 via-[var(--cyan-accent)]/10 to-transparent blur-2xl"
                />

                <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-center">
                  {packora && (
                    <div className="animate-float-slow relative z-10 w-[235px] sm:w-[245px]">
                      <PhoneMockup
                        slug={packora.slug}
                        appName={packora.name}
                        accentColor={packora.accentColor}
                        secondaryColor={packora.secondaryColor}
                        mockupScreens={localizeMockupScreens(packora, lang)}
                      />
                    </div>
                  )}

                  {testitime && (
                    <div className="hidden w-[215px] translate-y-4 opacity-95 sm:block">
                      <PhoneMockup
                        slug={testitime.slug}
                        appName={testitime.name}
                        accentColor={testitime.accentColor}
                        secondaryColor={testitime.secondaryColor}
                        mockupScreens={localizeMockupScreens(testitime, lang)}
                      />
                    </div>
                  )}
                </div>

                {/* Subtle Floating App Badge */}
                {packora && (
                  <div className="animate-fade-up absolute -bottom-3 start-2 z-20 hidden items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)]/90 px-4 py-2.5 shadow-xl backdrop-blur-md md:flex">
                    <ProjectIcon
                      slug={packora.slug}
                      accentColor={packora.accentColor}
                      secondaryColor={packora.secondaryColor}
                      size={36}
                    />
                    <div>
                      <p className="text-xs font-bold tracking-wide text-[var(--text-primary)]">
                        {packora.name}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        {packora.category[lang]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {dict.projectsSection.title}
            </h2>
            <p className="mt-2 max-w-2xl text-base text-[var(--text-secondary)]">
              {dict.projectsSection.subtitle}
            </p>
          </div>

          <Link
            href={`/${lang}/projects`}
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#1D74D8] transition hover:opacity-80 dark:text-[var(--cyan-accent)]"
          >
            <span>{dict.projectsSection.viewAll}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              lang={lang}
              dict={dict}
            />
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <PhilosophySection dict={dict} />
      </div>

      {/* Tech Stack Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <TechStackSection dict={dict} />
      </div>

      {/* Bottom Contact CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-[#101B30] via-[#132340] to-[#0B1220] px-6 py-12 text-center shadow-2xl sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-[var(--electric-blue)]/20 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-[#F5F7FA] sm:text-4xl">
              {dict.contact.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#CBD5E1] sm:text-lg">
              {dict.contact.description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--electric-blue)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--electric-blue)]/30 transition hover:brightness-110"
              >
                <span>{dict.nav.getInTouch}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              <Link
                href={`/${lang}/projects`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-[#F5F7FA] transition hover:bg-white/10"
              >
                <span>{dict.hero.primaryCta}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
