import { useQuery } from '@tanstack/react-query';
import { IInstitutionDetails } from '../app/[projectID]/school/[rspo]/(sections)/types';

export const createSingleSchoolDataQueryKey = (rspo: string) => [`/school/${rspo}`];

const useSingleSchoolData = (rspo: string) =>
  useQuery<IInstitutionDetails>(createSingleSchoolDataQueryKey(rspo));

export default useSingleSchoolData;
