import { useProjectConfig } from "../config/projectConfigContext";
import { useMemo } from "react";

const links = {
  DASHBOARD: '/',
  MAP_SEARCH_PAGE: '/map',
  CALCULATOR: '/calculator',
  SCHOOL: '/school',
  FAVORITES_PAGE: '/favorites',
  COMPARISON_PAGE: '/compare'
} as const;

const useLinks = () => {
  const { projectID } = useProjectConfig();
  const prefixedLinks = useMemo(() => (
    Object.entries(links).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: `/app/${projectID}${value}`
    }), {}) as typeof links
  ), [projectID])

  const helpers = useMemo(() => ({
    getSchoolPath: (rspo: string) => `/${prefixedLinks.SCHOOL}/${rspo}`
  } as const), [projectID])

  return {
    ...prefixedLinks,
    ...helpers
  }
}

export default useLinks
