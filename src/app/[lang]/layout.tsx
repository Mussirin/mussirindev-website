import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { LocaleHtmlSync } from '@/components/LocaleHtmlSync';
import { Navbar } from '@/components/Navbar';
import { isRtlLocale, isValidLocale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = getDictionary(lang);
  const dir = isRtlLocale(lang) ? 'rtl' : 'ltr';

  return (
    <div
      dir={dir}
      lang={lang}
      className="flex min-h-screen flex-col bg-[var(--surface-bg)] text-[var(--text-primary)]"
    >
      <LocaleHtmlSync lang={lang} dir={dir} />
      <Navbar lang={lang} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
