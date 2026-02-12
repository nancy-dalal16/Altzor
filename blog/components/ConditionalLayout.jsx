'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith('/studio');

  return (
    <>
      {!isStudioRoute && <Header />}
      <main className={isStudioRoute ? '' : 'min-h-screen pt-20'}>
        {children}
      </main>
      {!isStudioRoute && <Footer />}
    </>
  );
}
