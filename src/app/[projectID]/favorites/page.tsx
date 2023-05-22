import createProjectMetadata from '../../../utils/seo';
import FavoritesPage from './FavoritesPage';

export const generateMetadata = createProjectMetadata((projectName) => ({
  title: 'Ulubione szkoły',
  description: `Twoje ulubione szkoły w wyszukiwarce po8klasie ${projectName}`,
}));

export default () => <FavoritesPage />;
