import { FC } from 'react';
import AppNavbar from './AppNavbar';
import AppFooter from './AppFooter';
import BetaBanner from './BetaBanner';
import { ProjectConfig } from '../../config/types';

interface AppLayoutProps {
  projectAppearance?: ProjectConfig['appearance'];
  wideNavbar?: boolean;
  noFooter?: boolean;
  className?: string;
}

const AppLayout: FC<AppLayoutProps> = ({
  children,
  projectAppearance,
  wideNavbar,
  noFooter,
  className,
}) => (
  <div className={['bg-appBg flex flex-col', className ?? ''].join(' ')}>
    <AppNavbar projectName={projectAppearance?.appName} wide={wideNavbar} />
    <main className="pt-navbarHeight h-full" style={{ flex: '1 0 auto' }}>
      {children}
    </main>
    <div className="shrink-0">{!noFooter && <AppFooter />}</div>
    <BetaBanner />
  </div>
);

export default AppLayout;
