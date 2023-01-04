import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setFavoriteInstitutionsRspos } from "../store/slices/favoriteInstitutionsSlice";
import { toggleElementInArray } from "../utils/misc";
import { setInstitutionRsposToCompare } from "../store/slices/comparisonSlice";

const useComparisonInstitutions = () => {
  const institutionRsposToCompare = useAppSelector(state => state.comparison.institutionRsposToCompare)
  const dispatch = useAppDispatch()

  return {
    institutionRsposToCompare,
    institutionsToCompareNumber: institutionRsposToCompare.length,
    isInstitutionToCompare: (rspo: string) => institutionRsposToCompare.includes(rspo),
    toggleIsInstitutionToCompare: (rspo: string) => dispatch(setInstitutionRsposToCompare(
      toggleElementInArray(institutionRsposToCompare, rspo)
    ))
  }
}

export default useComparisonInstitutions
