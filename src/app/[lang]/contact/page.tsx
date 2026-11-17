import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Github, Mail, MapPin, Phone, User } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
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
    path: '/contact',
    title: dict.meta.pages.contact.title,
    description: dict.meta.pages.contact.description,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
          {dict.contact.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
          {dict.contact.description}
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        {/* Direct Contact Details */}
        <aside className="lg:col-span-5">
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {dict.contact.infoTitle}
            </h2>

            <dl className="mt-6 space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]">
                  <User className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-xs font-medium text-[var(--text-muted)]">
                    {dict.contact.nameLabel}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold text-[var(--text-primary)]">
                    Mustafa Sirin (mussirindev)
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-xs font-medium text-[var(--text-muted)]">
                    {dict.contact.emailLabel}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold">
                    <a
                      href="mailto:mustafasirin42@gmail.com"
                      className="text-[var(--text-primary)] transition hover:text-[var(--electric-blue)]"
                    >
                      mustafasirin42@gmail.com
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-xs font-medium text-[var(--text-muted)]">
                    {dict.contact.phoneLabel}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold">
                    <a
                      href="tel:+905388153048"
                      className="text-[var(--text-primary)] transition hover:text-[var(--electric-blue)]"
                      dir="ltr"
                    >
                      +90 538 8153048
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]">
                  <Github className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-xs font-medium text-[var(--text-muted)]">
                    {dict.contact.githubLabel}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold">
                    <a
                      href="https://github.com/Mussirin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-primary)] transition hover:text-[var(--electric-blue)]"
                    >
                      https://github.com/Mussirin
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <dt className="text-xs font-medium text-[var(--text-muted)]">
                    {dict.contact.locationLabel}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold text-[var(--text-primary)]">
                    {dict.contact.locationValue}
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </aside>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6 sm:p-8">
            <ContactForm dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
}
