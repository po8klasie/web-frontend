import { fetchJson } from '../serverFetch';
import type { ProjectConfig } from './types';

export const fetchProjectConfig = async (projectID: string) => {
  return fetchJson<ProjectConfig>(`/project/${projectID}`);
};
