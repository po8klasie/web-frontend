import { fetchData } from '../api/queryClient';
import { stringify } from 'query-string';
import * as Sentry from '@sentry/nextjs';

export const fetchProjectConfig = async (projectID: string, properties: string[]) => {
  const qs = stringify({ properties });
  try {
    Sentry.addBreadcrumb({
      message: `Fetching project data for projectID=${projectID}`,
      level: 'info',
    });
    return await fetchData(`/project/${projectID}/?${qs}`).then((res) => res.json());
  } catch (err) {
    Sentry.captureException(err);

    throw err;
  }
};
