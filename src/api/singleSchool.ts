import { ISchoolData } from '../types';
import { useQuery } from '@tanstack/react-query';

export const createSingleSchoolDataQueryKey = (rspo: string) => [`/school/${rspo}`];

const useSingleSchoolData = (rspo: string) =>
  useQuery<ISchoolData>(createSingleSchoolDataQueryKey(rspo));

export default useSingleSchoolData;
