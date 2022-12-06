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
  <div className={['bg-appBg', className ?? ''].join(' ')}>
    <AppNavbar projectName={projectAppearance?.appName} wide={wideNavbar} />
    <main className="pt-navbarHeight h-full">{children}</main>
    {!noFooter && <AppFooter />}
    <BetaBanner />
  </div>
);

export default AppLayout;
