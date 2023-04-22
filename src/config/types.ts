import { SchoolInfoSectionId } from '../components/app/SchoolPage/schoolInfoSections/schoolInfoSections';
import { AnyParser } from '../utils/searchParser';
import { ViewState } from 'react-map-gl';

export type FilterDefinition = {
  name: string;
  component: string; // TODO: More strict types
  // Leaving it as it is cause filters logic will change soon
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, unknown>; // TODO: More strict types
  parser: AnyParser;
  // TODO(micorix): Use generics
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue: any;
};

export type SearchViewConfig = {
  defaultMapView: Partial<ViewState>;
  filters: FilterDefinition[];
};


export interface SchoolInfoSection {
  sectionId: SchoolInfoSectionId
  options: Record<string, unknown>
}

export interface SchoolViewConfig {
  schoolInfoSections: SchoolInfoSection[];
}

export interface ProjectConfig {
  projectId: string;
  projectName: string;
  searchViewConfig: SearchViewConfig;
  schoolViewConfig: SchoolViewConfig;
}
