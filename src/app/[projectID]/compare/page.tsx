import createProjectMetadata from '../../../utils/seo';
import ComparisonPage from './_components/ComparisonPage';

export const generateMetadata = createProjectMetadata((projectName) => ({
  title: 'Porównywarka szkół',
  description: `Porównaj szkoły z po8klasie ${projectName}`,
}));

export default () => <ComparisonPage />;
