import { fetchJson } from '../serverFetch';
import { IInstitutionDetails } from '../../app/[projectID]/school/[rspo]/(sections)/types';

export const fetchInstitutionDetails = async (rspo: string) => {
  return fetchJson<IInstitutionDetails>(`/school/${rspo}`);
};
