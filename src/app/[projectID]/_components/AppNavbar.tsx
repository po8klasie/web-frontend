'use client';
import { FC, useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';
import { AiOutlineMenu } from '@react-icons/all-files/ai/AiOutlineMenu';
import { roundedSmallLinkClassName } from '../../../components/RoundedExternalLink';
import Brand from '../../../components/Brand';
import useFavoriteInstitutions from '../../../hooks/useFavoriteInstitutions';
import useComparisonInstitutions from '../../../hooks/useComparisonInstitutions';
import { AiOutlineComment } from '@react-icons/all-files/ai/AiOutlineComment';
import { PROJECT_PAGES } from "../../../utils/projectLinksHelpers";
import ProjectLink from "../../../components/ProjectLink";
import { useProjectConfig } from "../../../api/projectConfig/projectConfigContext";

interface AppNavbarProps {
  wide?: boolean;
}

const AppNavbar: FC<AppNavbarProps> = ({ wide }) => {
  const pathname = usePathname()
  const {projectName} = useProjectConfig()
  const { favoriteInstitutionsNumber } = useFavoriteInstitutions();
  const { institutionsToCompareNumber } = useComparisonInstitutions();

  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const toggleMenu = () => setIsMenuCollapsed(!isMenuCollapsed);

  const navLinks = [
    {
      label: 'Dashboard',
      href: PROJECT_PAGES.DASHBOARD,
    },
    {
      label: 'Mapa szkół',
      href: PROJECT_PAGES.MAP_SEARCH_PAGE,
    },
    {
      label: 'Ulubione szkoły',
      href: PROJECT_PAGES.FAVORITES_PAGE,
      badge: favoriteInstitutionsNumber,
    },
    {
      label: 'Porównaj szkoły',
      href: PROJECT_PAGES.COMPARISON_PAGE,
      badge: institutionsToCompareNumber,
    },
    {
      label: 'Kalkulator punktów',
      href: PROJECT_PAGES.CALCULATOR,
    },
  ];

  const getLinkClassName = (href: string) => {
    return pathname === href.split('?')[0] ? 'font-bold' : '';
  };

  return (
    <div className="fixed top-0 left-0 w-full z-99999 bg-white border-b border-lighten font-primary h-navbarHeight flex items-center">
      <div
        className={`${
          wide ? 'w-wideContainer' : 'w-container'
        } mx-auto lg:flex justify-between items-center py-3`}
      >
        <div className="relative flex items-center justify-between">
          <ProjectLink href={PROJECT_PAGES.DASHBOARD} className="flex items-center">
            <Brand projectName={projectName} className="font-bold text-xl" />
            <span className="ml-2 rounded-full bg-primaryBg text-primary uppercase px-2 py-1 text-xs font-bold">
              Beta
            </span>
          </ProjectLink>
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
                  <ProjectLink href={href} className={getLinkClassName(href)}>
                    {label}
                    {Boolean(badge) && (
                      <span className="ml-1 rounded-full px-1 text-sm bg-primaryBg text-primary font-bold">
                        {badge}
                      </span>
                    )}
                  </ProjectLink>
                </li>
              ))}
            </ul>
            <a
              href="/#support-us"
              className={[
                'font-bold cursor-pointer inline-block w-full sm:w-auto text-center',
                roundedSmallLinkClassName,
                '',
              ].join(' ')}
            >
              Wesprzyj projekt
            </a>
            <a
              href="/feedback"
              rel="noreferrer noopener"
              className="ml-3 relative text-gray-500 hover:text-gray-600"
              title="Podziel się opinią"
            >
              <AiOutlineComment className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;
