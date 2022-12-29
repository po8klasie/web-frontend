import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setFavoriteInstitutionsRspos } from "../store/slices/favoriteInstitutionsSlice";
import { toggleElementInArray } from "../utils/misc";

const useFavoriteInstitutions = () => {
  const favoriteInstitutionsRspos = useAppSelector(state => state.favoriteInstitutions.favoriteInstitutionsRspos)
  const dispatch = useAppDispatch()

  return {
    favoriteInstitutionsRspos,
    favoriteInstitutionsNumber: favoriteInstitutionsRspos.length,
    isInstitutionFavorite: (rspo: string) => favoriteInstitutionsRspos.includes(rspo),
    toggleIsInstitutionFavorite: (rspo: string) => dispatch(setFavoriteInstitutionsRspos(
      toggleElementInArray(favoriteInstitutionsRspos, rspo)
    ))
  }
}

export default useFavoriteInstitutions
