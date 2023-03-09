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

export interface ISchoolSearchData {
  projectId: string;
  name: string;
  rspo: string;
  rspoFacilityType: keyof typeof institutionTypes;
  street: string;
  buildingNumber: string;
  apartmentNumber: string;
  city: string;

  isPublic: boolean;

  latitude: number;
  longitude: number;

  borough: string;

  foreignLanguages: string[] | null;
  classProfiles: string[] | null;
}

export interface IPublicTransportStopWrapper {
  distance: number;
  publicTransportStop: IPublicTransportStop;
}

export interface ISchoolData extends ISchoolSearchData {
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
