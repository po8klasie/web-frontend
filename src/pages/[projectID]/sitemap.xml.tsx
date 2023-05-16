import type { GetServerSideProps } from 'next';
import { publicRuntimeConfig } from '../../runtimeConfig';

const { API_URL, SITE_URL } = publicRuntimeConfig;

const PROJECT_LINKS = ['/', '/map', '/compare', '/calculator', '/favorites'];

const generateSiteMap = (projectId: string, rspos: string[]) => {
  const wrapURLWithTag = (url: string) => `<url><loc>${url}</loc></url>`;
  const getFullUrl = (path: string) => `${SITE_URL}/app/${projectId}${path}`;
  const getSchoolPath = (rspo: string) => `/school/${rspo}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     ${PROJECT_LINKS.map((link) => wrapURLWithTag(getFullUrl(link))).join('')}
     ${rspos.map((rspo) => wrapURLWithTag(getFullUrl(getSchoolPath(rspo)))).join('')}
   </urlset>
 `;
};

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const projectId = params?.projectID as string;

  const schoolsForProject = await fetch(
    `${API_URL}/search/institution?project_id=${projectId}`,
  ).then((r) => r.json());
  const rspos = schoolsForProject.map((school) => school.rspo);

  const sitemap = generateSiteMap(projectId, rspos);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default () => {};
