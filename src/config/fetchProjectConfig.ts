import { fetchData } from '../api/queryClient';
import { stringify } from 'query-string';

export const fetchProjectConfig = (projectID: string, properties: string[]) => {
  const qs = stringify({ properties });
  return fetchData(`/project/${projectID}/?${qs}`).then((res) => res.json());
};
