import { useMemo } from "react";
import { stringify } from "query-string";
import { useQuery } from "@tanstack/react-query";
import useComparisonInstitutions from "../../../../hooks/useComparisonInstitutions";
import { ComparisonInstitutionI } from "../types";

const useComparisonInstitutionsQuery = () => {
  const {institutionRsposToCompare } = useComparisonInstitutions()
  const queryString = useMemo(
    () => stringify({rspo: institutionRsposToCompare}),
    [institutionRsposToCompare]
  )

  const path = `/comparison?${queryString}`

  return useQuery<ComparisonInstitutionI[]>([path], {
    enabled: institutionRsposToCompare.length > 0,
    placeholderData: () => [] as ComparisonInstitutionI[]
  })
}
export default useComparisonInstitutionsQuery
