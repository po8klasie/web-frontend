import { useProjectConfig } from '../api/projectConfig/projectConfigContext';
import { useMemo } from 'react';

const links = {
  DASHBOARD: '/',
  MAP_SEARCH_PAGE: '/map',
  CALCULATOR: '/calculator',
  SCHOOL: '/school',
  FAVORITES_PAGE: '/favorites',
  COMPARISON_PAGE: '/compare',
} as const;

const useLinks = () => {
  const { projectId } = useProjectConfig();
  const prefixedLinks = useMemo(
    () =>
      Object.entries(links).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: `/${projectId}${value}`,
        }),
        {},
      ) as typeof links,
    [projectId],
  );

  const helpers = useMemo(
    () =>
      ({
        getSchoolPath: (rspo: string) => `${prefixedLinks.SCHOOL}/${rspo}`,
      } as const),
    [prefixedLinks.SCHOOL],
  );

  return {
    ...prefixedLinks,
    ...helpers,
  };
};

export default useLinks;
