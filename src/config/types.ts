import { SchoolInfoSectionId } from '../components/app/SchoolPage/schoolInfoSections/schoolInfoSections';
import { MapContainerProps } from 'react-leaflet';
import { AnyParser } from '../utils/searchParser';

export type FilterDefinition = {
  name: string;
  component: string; // TODO: More strict types
  // Leaving it as it is cause filters logic will change soon
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any; // TODO: More strict types
  parser: AnyParser;
  defaultValue: any;
};

export type SearchViewConfig = {
  mapOptions: MapContainerProps;
  defaultQuery: Record<string, string>;
  filters: FilterDefinition[];
};

export interface AppearanceConfig {
  appName: string;
}

export interface SchoolInfoConfig {
  enabledSchoolInfoSectionIds: SchoolInfoSectionId[];
}

export interface ProjectConfig {
  projectID: string;
  searchView: SearchViewConfig;
  appearance: AppearanceConfig;
  schoolInfo: SchoolInfoConfig;
}
