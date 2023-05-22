import { MetadataRoute } from 'next';
import environment from '../environment/server';
import { ISchoolOverview } from '../types';
import forceServerComponentDynamicRender from '../utils/forceServerComponentDynamicRender';

const {
  publicEnvironment: { API_URL, SITE_URL },
} = environment;

const PROJECT_LINKS = ['/', '/map', '/compare', '/calculator', '/favorites'];

const getProjectIds = async (): Promise<string[]> => {
  const projectConfigs = await fetch(`${API_URL}/project`).then((res) => res.json());
  return projectConfigs.map((projectConfig) => projectConfig.project_id);
};

const getUrlsForProject = async (projectId: string): Promise<{ url: string }[]> => {
  const getUrlEntry = (path: string) => ({
    url: `${SITE_URL}/app/${projectId}${path}`,
  });
  const getSchoolPath = (rspo: string) => `/school/${rspo}`;

  const schoolsForProject = (await fetch(
    `${API_URL}/search/institution?project_id=${projectId}`,
  ).then((r) => r.json())) as ISchoolOverview[];

  return [
    ...PROJECT_LINKS.map(getUrlEntry),
    ...schoolsForProject.map((school) => getUrlEntry(getSchoolPath(school.rspo))),
  ];
};

const generateSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // XXX(micorix): Do not fetch sitemap at build time if no env var provided
  if (!API_URL) forceServerComponentDynamicRender();
  const projectIds = await getProjectIds();
  return (await Promise.all(projectIds.map(getUrlsForProject))).flat();
};

export default generateSitemap;
