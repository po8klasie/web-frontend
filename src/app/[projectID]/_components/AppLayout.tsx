'use client';

import type { FC, PropsWithChildren } from 'react';
import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';
import BetaBanner from './BetaBanner';
import { usePathname } from 'next/navigation';

interface AppLayoutProps {
  className?: string;
}

const AppLayout: FC<PropsWithChildren<AppLayoutProps>> = ({ children, className }) => {
  const pathname = usePathname();
  const isMapSite = pathname.includes('map');
  return (
    <div className={['bg-appBg flex flex-col min-h-full', className ?? ''].join(' ')}>
      <AppNavbar wide={isMapSite} />
      <main className={`pt-navbarHeight ${isMapSite ? 'h-full' : ''}`} style={{ flex: '1 0 auto' }}>
        {children}
      </main>
      <div className="shrink-0">{!isMapSite && <AppFooter />}</div>
      <BetaBanner />
    </div>
  );
};

export default AppLayout;
