'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { defaultLocale } from '@/i18n/config';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1220] text-[#F5F7FA]">
      <div className="text-center">
        <p className="text-sm text-[#A7B3C4]">Redirecting to mussirindev…</p>
        <Link
          href={`/${defaultLocale}`}
          className="mt-3 inline-block text-sm font-medium text-[#3B9EFF] underline"
        >
          Continue to English site
        </Link>
      </div>
    </div>
  );
}
