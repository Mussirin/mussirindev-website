'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Check,
  ChevronDown,
  Globe,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/components/ThemeProvider';
import { localeNames, locales } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/types';
import type { Locale } from '@/types/project';

const LOCALE_STORAGE_KEY = 'mussirindev-locale';

export interface NavbarProps {
  lang: Locale;
  dict: Dictionary;
}

export function Navbar({ lang, dict }: NavbarProps) {
  const pathname = usePathname() || `/${lang}`;
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setLangOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { href: `/${lang}`, label: dict.nav.home, exact: true },
    { href: `/${lang}/projects`, label: dict.nav.projects, exact: false },
    { href: `/${lang}/about`, label: dict.nav.about, exact: false },
    { href: `/${lang}/contact`, label: dict.nav.contact, exact: false },
  ];

  const isActiveRoute = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href || pathname === `${href}/`;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLocaleSwitch = (nextLocale: Locale) => {
    setLangOpen(false);
    setMobileOpen(false);

    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    } catch {
      // Ignore storage access errors in restricted environments
    }

    if (nextLocale === lang) return;

    const segments = pathname.split('/');
    if (segments.length > 1 && segments[1] === lang) {
      segments[1] = nextLocale;
    } else {
      segments.splice(1, 0, nextLocale);
    }

    const nextPath = segments.join('/') || `/${nextLocale}`;
    router.push(nextPath);
  };

  const currentLocaleInfo = localeNames[lang];
  const themeLabel =
    theme === 'dark' ? dict.nav.themeLight : dict.nav.themeDark;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-border-subtle bg-surface-bg/85 backdrop-blur-md shadow-xs'
          : 'border-b border-transparent bg-surface-bg/70 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href={`/${lang}`}
          className="inline-flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-blue"
          aria-label="mussirindev"
        >
          <Logo size="sm" />
        </Link>

        {/* Desktop Pill Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1 rounded-full border border-border-subtle bg-surface-primary/80 p-1 shadow-xs"
        >
          {navItems.map((item) => {
            const active = isActiveRoute(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue ${
                  active
                    ? 'bg-electric-blue text-white shadow-xs'
                    : 'text-text-secondary hover:bg-surface-secondary/70 hover:text-text-primary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Language, Theme, Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangOpen((prev) => !prev)}
              aria-label={dict.nav.languageLabel}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border-subtle bg-surface-primary/80 px-3 text-xs font-medium text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue"
            >
              <Globe className="h-3.5 w-3.5 text-electric-blue" aria-hidden="true" />
              <span className="hidden sm:inline">{currentLocaleInfo.nativeName}</span>
              <span className="sm:hidden uppercase">{lang}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  langOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {langOpen && (
              <div
                role="listbox"
                aria-label={dict.nav.languageLabel}
                className="absolute end-0 mt-2 w-44 origin-top-end overflow-hidden rounded-2xl border border-border-subtle bg-surface-primary p-1.5 shadow-lg backdrop-blur-md"
              >
                {locales.map((loc) => {
                  const info = localeNames[loc];
                  const selected = loc === lang;
                  return (
                    <button
                      key={loc}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => handleLocaleSwitch(loc)}
                      className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-start text-sm transition-colors ${
                        selected
                          ? 'bg-electric-blue/12 font-medium text-electric-blue'
                          : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span aria-hidden="true">{info.flag}</span>
                        <span>{info.nativeName}</span>
                      </span>
                      {selected && <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface-primary/80 text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue"
          >
            {mounted ? (
              theme === 'dark' ? (
                <Sun className="h-4 w-4 text-cyan-accent" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4 text-navy-deep" aria-hidden="true" />
              )
            ) : (
              <Sun className="h-4 w-4 opacity-60" aria-hidden="true" />
            )}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface-primary/80 text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-blue md:hidden"
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-border-subtle bg-surface-bg/95 px-4 pb-5 pt-3 backdrop-blur-md md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const active = isActiveRoute(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-electric-blue text-white'
                      : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
