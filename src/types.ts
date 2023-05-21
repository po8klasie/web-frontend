import { institutionTypes } from './utils/apiDataMapping';

export interface IPublicTransportRoute {
  name: string;
  routeFrom?: string;
  routeTo?: string;
  ref?: string;
  type: string;
  operator?: string;
}

export interface IPublicTransportStop {
  name: string;
  latitude: number;
  longitude: number;
  publicTransportRoutes: IPublicTransportRoute[];
}

export interface ISchoolOverview {
  rspo: string;
  projectId: string;

  name: string;

  isPublic: boolean;
  rspoInstitutionType: keyof typeof institutionTypes;
  institutionTypeGeneralized: 'secondary_school';

  city: string;
  street: string;
  borough: string;
  buildingNumber: string;
  apartmentNumber: string;

  latitude: number;
  longitude: number;

  availableLanguages: string[];
  classes: { extendedSubjects: string[] }[];

  pointsStatsMin: number | null;
}

export interface IPublicTransportStopWrapper {
  distance: number;
  publicTransportStop: IPublicTransportStop;
}

export interface ISchoolData extends ISchoolOverview {
  postalCode: string;
  email: string;
  phone: string;
  website: string;
  description: string;
  extracurricularActivities?: string[];
  schoolEvents?: string[];
  noOfSchoolTripsPerYear?: string;
  sportActivities?: string[];
  sportInfrastructure?: string[];
  ngoPartners?: string[];
  universityPartners?: string[];
  avgStudentsNoPerClass?: number;
  maxStudentsNoPerClass?: number;
  minStudentsNoPerClass?: number;
  noOfStudentsTakingPartInOlympiads?: string;
  noOfFulltimePsychologistPositions?: string;
  // TODO(micorix): Provide explicit type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classes: any;
  publicTransportStops: IPublicTransportStopWrapper[];
}
