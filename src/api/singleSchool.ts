import { useQuery } from '@tanstack/react-query';
import { IInstitutionDetails } from '../components/app/SchoolPage/schoolInfoSections/types';

export const createSingleSchoolDataQueryKey = (rspo: string) => [`/school/${rspo}`];

const useSingleSchoolData = (rspo: string) =>
  useQuery<IInstitutionDetails>(createSingleSchoolDataQueryKey(rspo));

export default useSingleSchoolData;
