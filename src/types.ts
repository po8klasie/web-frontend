import { institutionTypes } from './utils/apiDataMapping';
import { AppContext } from "next/app";
import { NextPage } from "next";
import { ReactNode } from "react";

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

export type NextAppRouterPageWithParamsT<T, J = Record<string, never>> = (context: {params: T} & J) => ReactNode | Promise<ReactNode>;

export interface IProjectPageParams {
  projectID: string
}

export type ProjectPageT<T = Record<string, never>> = NextAppRouterPageWithParamsT<IProjectPageParams & T>;

export interface ISchoolPageParams extends IProjectPageParams {
  rspo: string
}

export type SchoolPageT<T = Record<string, never>> = NextAppRouterPageWithParamsT<ISchoolPageParams & T>
