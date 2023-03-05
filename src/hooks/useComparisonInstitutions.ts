import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleElementInArray } from '../utils/misc';
import { setInstitutionRsposToCompare } from '../store/slices/comparisonSlice';
import { useProjectConfig } from '../config/projectConfigContext';

const useComparisonInstitutions = () => {
  const institutionRsposToCompare = useAppSelector(
    (state) => state.comparison.institutionRsposToCompare,
  );
  const dispatch = useAppDispatch();
  const { projectID } = useProjectConfig();
  const institutionRsposToComparePerProject = institutionRsposToCompare[projectID as string];

  return {
    institutionRsposToCompare: institutionRsposToComparePerProject,
    institutionsToCompareNumber: institutionRsposToComparePerProject.length,
    isInstitutionToCompare: (rspo: string) => institutionRsposToComparePerProject.includes(rspo),
    toggleIsInstitutionToCompare: (rspo: string) =>
      dispatch(
        setInstitutionRsposToCompare({
          projectID: projectID as string,
          rspos: toggleElementInArray(institutionRsposToComparePerProject, rspo),
        }),
      ),
  };
};

export default useComparisonInstitutions;
