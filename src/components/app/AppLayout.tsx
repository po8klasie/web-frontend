import { FC } from 'react';
import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';
import BetaBanner from './BetaBanner';

interface AppLayoutProps {
  projectName: string;
  wideNavbar?: boolean;
  noFooter?: boolean;
  className?: string;
}

const AppLayout: FC<AppLayoutProps> = ({
  children,
  projectName,
  wideNavbar,
  noFooter,
  className,
}) => (
  <div className={['bg-appBg flex flex-col', className ?? ''].join(' ')}>
    <AppNavbar projectName={projectName} wide={wideNavbar} />
    <main className="pt-navbarHeight h-full" style={{ flex: '1 0 auto' }}>
      {children}
    </main>
    <div className="shrink-0">{!noFooter && <AppFooter />}</div>
    <BetaBanner />
  </div>
);

export default AppLayout;
