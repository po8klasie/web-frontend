import { Metadata } from 'next';
import { fetchProjectConfig } from '../api/projectConfig/projectConfig';
import { fetchInstitutionDetails } from '../api/institutionDetails/institutionDetails';
import environment from '../environment/server';

export const defaultMetadata: Metadata = {
  title: 'po8klasie - wyszukiwarka szkół średnich"',
  description: 'Najprostsza i najszybsza wyszukiwarka szkół średnich',
  twitter: {
    creator: '@po8klasie',
    card: 'summary_large_image',
  },
};

const createProjectMetadata =
  (getMetadata: (projectName: string, ctx: Record<string, unknown>) => Partial<Metadata>) =>
  async (context) => {
    const {
      params: { projectID },
    } = context;
    const { projectName } = await fetchProjectConfig(projectID);
    const metadata = await Promise.resolve(getMetadata(projectName, context));
    return {
      ...defaultMetadata,
      ...metadata,
      title: metadata.title
        ? `${metadata.title} | po8klasie ${projectName}`
        : defaultMetadata.title,
    };
  };

export const createSchoolMetadata = () =>
  createProjectMetadata(async (projectName, { params: { rspo, projectID } }) => {
    const institutionDetails = await fetchInstitutionDetails(rspo);
    const SITE_URL = environment.publicEnvironment.SITE_URL;
    return {
      metadataBase: SITE_URL,
      title: institutionDetails.name,
      description: `Przeglądaj ofertę edukacyjną, progi punktowe czy dojazd do szkoły "${institutionDetails.name}" z po8klasie ${projectName}`,
      openGraph: {
        images: `/app/${projectID}/school/${rspo}/og-image`,
      },
    };
  });

export default createProjectMetadata;
