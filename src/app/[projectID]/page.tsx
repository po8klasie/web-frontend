import Brand from '../../components/Brand';
import { FiMap } from '@react-icons/all-files/fi/FiMap';
import { IconType } from '@react-icons/all-files';
import { FC } from 'react';
import { AiOutlineCalculator } from '@react-icons/all-files/ai/AiOutlineCalculator';
import { FiStar } from '@react-icons/all-files/fi/FiStar';
import { RectangleStackIcon as RectangleStackIconOutline } from '@heroicons/react/24/outline';
import { AiOutlineComment } from '@react-icons/all-files/ai/AiOutlineComment';
import styles from './_styles/ProjectDashboardPage.module.css';
import ProjectLink from '../../components/ProjectLink';
import { PROJECT_PAGES } from '../../utils/projectLinksHelpers';
import { ProjectPageT } from '../../types';
import DashboardSearchField from './_components/DashboardSearchField';
import createProjectMetadata from '../../utils/seo';

export const generateMetadata = createProjectMetadata(() => ({
  title: 'Dashboard',
}));

interface TileProps {
  path: string;
  icon: IconType;
  name: string;
}

const Tile: FC<TileProps> = ({ path, icon: Icon, name }) => (
  <div className={styles.tile}>
    <ProjectLink href={path}>
      <Icon />
      <span>{name}</span>
    </ProjectLink>
  </div>
);

const tiles: TileProps[] = [
  {
    name: 'Przeglądaj mapę szkół',
    icon: FiMap,
    path: PROJECT_PAGES.MAP_SEARCH_PAGE,
  },
  {
    name: 'Przeglądaj ulubione szkoły',
    icon: FiStar,
    path: PROJECT_PAGES.FAVORITES_PAGE,
  },
  {
    name: 'Porównaj szkoły',
    icon: RectangleStackIconOutline,
    path: PROJECT_PAGES.COMPARISON_PAGE,
  },
  {
    name: 'Oblicz punkty rekrutacyjne',
    icon: AiOutlineCalculator,
    path: PROJECT_PAGES.CALCULATOR,
  },
];

const ProjectDashboardPage: ProjectPageT = () => {
  return (
    <div className="w-11/12 sm:w-4/5 mx-auto mt-20 h-full">
      <h1 className="text-center ">
        <Brand projectNameClassName="text-2xl" className="font-bold text-4xl" />
        <span className="ml-2 rounded-full bg-primaryBg text-primary uppercase px-2 py-1 text-xs font-bold">
          Beta
        </span>
      </h1>
      <div className="flex items-center text-2xl lg:w-3/5 bg-white mx-auto mt-10 rounded-xl shadow-xl">
        <DashboardSearchField />
      </div>
      <div className="mt-10 lg:mt-20 grid sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-10">
        {tiles.map((tileProps) => (
          <Tile {...tileProps} key={tileProps.name} />
        ))}
      </div>
      <div className="mt-20 text-gray-500">
        <span className="flex">
          Jesteśmy w fazie rozwoju naszej aplikacji. W dowolnej chwili możesz zgłosić błędy lub
          sugestie, korzystając z ikony
          <AiOutlineComment className="text-xl mx-2" />w prawym górnym rogu.
        </span>
        <div className="mt-2">
          <a
            href="/feedback"
            rel="noreferrer noopener"
            className="inline-flex items-center py-1 px-2 rounded text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-600 transition"
          >
            Zgłoś sugestie teraz
            <AiOutlineComment className="ml-2 text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboardPage;
