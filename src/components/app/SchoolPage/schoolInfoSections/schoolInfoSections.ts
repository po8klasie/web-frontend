import { FC } from 'react';
import OverviewSection from './OverviewSection';
import EducationalOfferSection from './EducationalOfferSection';
import ClassProfilesSection from './ClassProfilesSection';
import { SectionComponentProps } from './types';
import PublicTransportSection from './PublicTransportSection';
import SportSection from './SportSection';
import CollaborationSection from './CollaborationSection';

export type SchoolInfoSectionId =
  | 'overview'
  | 'classProfiles'
  | 'educationalOffer'
  | 'sport'
  | 'collaboration'
  | 'publicTransport';

export interface SchoolInfoSectionConfig {
  id: SchoolInfoSectionId;
  name: string;
  SectionComponent: FC<SectionComponentProps>;
}

const schoolInfoSections: Record<SchoolInfoSectionId, SchoolInfoSectionConfig> = {
  overview: {
    id: 'overview',
    name: 'Podstawowe informacje',
    SectionComponent: OverviewSection,
  },
  classProfiles: {
    id: 'classProfiles',
    name: 'Profile klas',
    SectionComponent: ClassProfilesSection,
  },
  educationalOffer: {
    id: 'educationalOffer',
    name: 'Oferta edukacyjna',
    SectionComponent: EducationalOfferSection,
  },
  sport: {
    id: 'sport',
    name: 'Sport',
    SectionComponent: SportSection,
  },
  collaboration: {
    id: 'collaboration',
    name: 'Współpraca',
    SectionComponent: CollaborationSection,
  },
  publicTransport: {
    id: 'publicTransport',
    name: 'Dojazd komunikacją',
    SectionComponent: PublicTransportSection,
  },
};

export default schoolInfoSections;
