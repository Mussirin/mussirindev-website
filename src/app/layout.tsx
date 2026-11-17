import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { getSiteUrl } from '@/lib/seo';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: 'mussirindev — Independent Mobile App Studio',
  description:
    'Independent mobile app studio founded by Mustafa Sirin in Türkiye, building simple, useful, and thoughtfully designed apps for Android and iOS.',
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icon.svg`,
    shortcut: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icon.svg`,
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icon.svg`,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--surface-bg)] font-sans text-[var(--text-primary)] antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
