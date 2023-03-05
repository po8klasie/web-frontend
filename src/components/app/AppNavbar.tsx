import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';
import { AiOutlineMenu } from '@react-icons/all-files/ai/AiOutlineMenu';
import { roundedSmallLinkClassName } from '../RoundedExternalLink';
import Brand from '../Brand';
import useLinks from '../../hooks/useLinks';
import useFavoriteInstitutions from '../../hooks/useFavoriteInstitutions';
import useComparisonInstitutions from '../../hooks/useComparisonInstitutions';

interface AppNavbarProps {
  projectName?: string;
  wide?: boolean;
}

const AppNavbar: FC<AppNavbarProps> = ({ projectName, wide }) => {
  const router = useRouter();
  const links = useLinks();
  const { favoriteInstitutionsNumber } = useFavoriteInstitutions();
  const { institutionsToCompareNumber } = useComparisonInstitutions();

  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const toggleMenu = () => setIsMenuCollapsed(!isMenuCollapsed);

  const navLinks = [
    {
      label: 'Dashboard',
      href: links.DASHBOARD,
    },
    {
      label: 'Mapa szkół',
      href: links.MAP_SEARCH_PAGE,
    },
    {
      label: 'Ulubione szkoły',
      href: links.FAVORITES_PAGE,
      badge: favoriteInstitutionsNumber === 0 ? null : favoriteInstitutionsNumber,
    },
    {
      label: 'Porównaj szkoły',
      href: links.COMPARISON_PAGE,
      badge: institutionsToCompareNumber === 0 ? null : institutionsToCompareNumber,
    },
    {
      label: 'Kalkulator punktów',
      href: links.CALCULATOR,
    },
  ];

  const getLinkClassName = (href: string) => {
    return router.pathname === href.split('?')[0] ? 'font-bold' : '';
  };

  return (
    <div className="fixed top-0 left-0 w-full z-99999 bg-white border-b border-lighten font-primary h-navbarHeight flex items-center">
      <div
        className={`${
          wide ? 'w-wideContainer' : 'w-container'
        } mx-auto lg:flex justify-between items-center py-3`}
      >
        <div className="relative flex items-center justify-between">
          <Link href={links.DASHBOARD}>
            <a className="flex items-center">
              <Brand projectName={projectName} className="font-bold text-xl" />
              <span className="ml-2 rounded-full bg-primaryBg text-primary uppercase px-2 py-1 text-xs font-bold">
                Beta
              </span>
            </a>
          </Link>
          <button className="text-xl lg:hidden" onClick={toggleMenu} type="button">
            {isMenuCollapsed ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
        <div
          className={` absolute z-10 top-navbarHeight bg-white w-full left-0 lg:w-auto pb-3 lg:pb-0 lg:static ${
            !isMenuCollapsed && 'hidden lg:block'
          }`}
        >
          <div className="w-container mx-auto lg:w-full lg:flex items-center">
            <ul className="lg:flex lg:mr-8">
              {navLinks.map(({ label, href, badge }) => (
                <li key={href} className="lg:mx-4 my-4 lg:my-0">
                  <Link href={href}>
                    <a className={getLinkClassName(href)}>
                      {label}

                      {badge && (
                        <span className="ml-1 rounded-full px-1 text-sm bg-primaryBg text-primary font-bold">
                          {badge}
                        </span>
                      )}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/#support-us">
              <a
                className={[
                  'font-bold cursor-pointer inline-block w-full sm:w-auto text-center',
                  roundedSmallLinkClassName,
                  '',
                ].join(' ')}
              >
                Wesprzyj projekt
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;
