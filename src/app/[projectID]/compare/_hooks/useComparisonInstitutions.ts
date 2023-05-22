import { useMemo } from 'react';
import { stringify } from 'query-string';
import useComparisonInstitutions from '../../../../hooks/useComparisonInstitutions';
import { ComparisonInstitutionI } from '../_components/types';
import { useAPIQuery } from '../../../../api/queryClient';

const useComparisonInstitutionsQuery = () => {
  const { institutionRsposToCompare } = useComparisonInstitutions();
  const queryString = useMemo(
    () => stringify({ rspo: institutionRsposToCompare }),
    [institutionRsposToCompare],
  );

  const path = `/comparison?${queryString}`;

  return useAPIQuery<ComparisonInstitutionI[]>([path], {
    enabled: institutionRsposToCompare.length > 0,
    placeholderData: () => [] as ComparisonInstitutionI[],
  });
};
export default useComparisonInstitutionsQuery;
