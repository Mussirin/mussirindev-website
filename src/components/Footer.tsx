import Link from 'next/link';
import { Github, Mail, Phone } from 'lucide-react';
import { Logo } from '@/components/Logo';
import type { Dictionary } from '@/i18n/dictionaries/types';
import type { Locale } from '@/types/project';

export interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

export function Footer({ lang, dict }: FooterProps) {
  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/projects`, label: dict.nav.projects },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  const legalLinks = [
    { href: `/${lang}/privacy`, label: dict.legal.privacy.title },
    { href: `/${lang}/terms`, label: dict.legal.terms.title },
  ];

  return (
    <footer className="border-t border-border-subtle bg-surface-primary/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link
              href={`/${lang}`}
              className="inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-blue"
            >
              <Logo size="md" />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
              {dict.footer.navigationTitle}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-muted transition-colors hover:text-electric-blue"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
              {dict.footer.legalTitle}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-muted transition-colors hover:text-electric-blue"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-primary">
              {dict.footer.connectTitle}
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="mailto:mustafasirin42@gmail.com"
                  className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-electric-blue"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="break-all">mustafasirin42@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+905388153048"
                  dir="ltr"
                  className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-electric-blue"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>+90 538 8153048</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Mussirin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-electric-blue"
                >
                  <Github className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>github.com/Mussirin</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border-subtle pt-6 text-xs text-text-muted sm:flex-row sm:items-center">
          <p>{dict.footer.copyright}</p>
          <p className="font-medium text-text-secondary">
            mussirindev · Mustafa Sirin
          </p>
        </div>
      </div>
    </footer>
  );
}
