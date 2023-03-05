import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFavoriteInstitutionsRspos } from '../store/slices/favoriteInstitutionsSlice';
import { toggleElementInArray } from '../utils/misc';
import { useProjectConfig } from '../config/projectConfigContext';

const useFavoriteInstitutions = () => {
  const favoriteInstitutionsRspos = useAppSelector(
    (state) => state.favoriteInstitutions.favoriteInstitutionsRspos,
  );
  const dispatch = useAppDispatch();
  const { projectID } = useProjectConfig();
  const favoriteInstitutionsRsposPerProject = favoriteInstitutionsRspos[projectID as string];

  return {
    favoriteInstitutionsRspos: favoriteInstitutionsRsposPerProject,
    favoriteInstitutionsNumber: favoriteInstitutionsRsposPerProject.length,
    isInstitutionFavorite: (rspo: string) => favoriteInstitutionsRsposPerProject.includes(rspo),
    toggleIsInstitutionFavorite: (rspo: string) =>
      dispatch(
        setFavoriteInstitutionsRspos({
          projectID: projectID as string,
          rspos: toggleElementInArray(favoriteInstitutionsRsposPerProject, rspo),
        }),
      ),
  };
};

export default useFavoriteInstitutions;
