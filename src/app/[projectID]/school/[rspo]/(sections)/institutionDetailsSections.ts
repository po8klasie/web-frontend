import { fetchProjectConfig } from '../../../../../api/projectConfig/projectConfig';

export interface InstitutionDetailsSectionConfig {
  id: string;
  name: string;
}

const institutionDetailsSectionConfigs = {
  overview: {
    id: 'overview',
    name: 'Podstawowe informacje',
  },
  classProfiles: {
    id: 'classProfiles',
    name: 'Profile klas',
  },
  educationalOffer: {
    id: 'educationalOffer',
    name: 'Oferta edukacyjna',
  },
  sport: {
    id: 'sport',
    name: 'Sport',
  },
  collaboration: {
    id: 'collaboration',
    name: 'Współpraca',
  },
  publicTransport: {
    id: 'publicTransport',
    name: 'Dojazd komunikacją',
  },
} satisfies Record<string, InstitutionDetailsSectionConfig>;

export type InstitutionDetailsSectionId = keyof typeof institutionDetailsSectionConfigs;

export const getSectionConfigs = async (projectID: string) => {
  const projectConfig = await fetchProjectConfig(projectID);
  return projectConfig.schoolViewConfig.schoolInfoSections.map(
    ({ sectionId }) => institutionDetailsSectionConfigs[sectionId],
  );
};

export default institutionDetailsSectionConfigs;
