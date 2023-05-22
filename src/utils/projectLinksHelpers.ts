export const PROJECT_PAGES = {
  DASHBOARD: '/',
  MAP_SEARCH_PAGE: '/map',
  CALCULATOR: '/calculator',
  SCHOOL: '/school',
  FAVORITES_PAGE: '/favorites',
  COMPARISON_PAGE: '/compare',
} as const;

export const getInstitutionPath = (rspo: string) => `${PROJECT_PAGES.SCHOOL}/${rspo}`;
