import { IPublicTransportStop } from '../../../../../types';

export interface IInstitutionDetailsOverviewSectionData {
  city: string;
  postalCode: string;
  street: string;
  buildingNumber: string;
  apartmentNumber: string;

  email: string;
  phone: string;
  website: string;
  description: string | null;

  latitude: number;
  longitude: number;
}

export interface IInstitutionDetailsEducationOfferSectionData {
  extracurricularActivities: string[] | null;
  schoolEvents: string[] | null;
  noOfSchoolTripsPerYear: string | null;
}

export interface IInstitutionDetailsSportsSectionData {
  sportActivities: string[] | null;
  sportInfrastructure: string[] | null;
}

export interface IInstitutionDetailsPartnersSectionData {
  NGOPartners: string[] | null;
  universityPartners: string[] | null;
}

export interface IInstitutionDetailsClassProfileData {
  classSymbol: string | null;
  className: string | null;
  classType: string | null;

  year: number;

  extendedSubjects: string[];
  occupation: string | null;
  availableLanguages: string[];

  url: string | null;

  pointsStatsMin: number | null;
  pointsStatsAvg: number | null;
  pointsStatsMax: number | null;

  description: string | null;
}

export interface IInstitutionDetailsClassProfilesSectionData {
  classes: Record<number, IInstitutionDetailsClassProfileData[]>;
}

export interface IInstitutionDetailsPublicTransportSection {
  publicTransportStops:
    | {
        publicTransportStop: IPublicTransportStop;
        distance: number;
      }[]
    | null;
}

export type IInstitutionDetails = {
  projectId: string;
  name: string;
  institution_type_generalized: 'secondary_school';
  rspo: string;
  isPublic: boolean;
} & IInstitutionDetailsOverviewSectionData &
  IInstitutionDetailsEducationOfferSectionData &
  IInstitutionDetailsSportsSectionData &
  IInstitutionDetailsPartnersSectionData &
  IInstitutionDetailsClassProfilesSectionData &
  IInstitutionDetailsPublicTransportSection;

export interface SectionComponentProps {
  school: IInstitutionDetails;
}
