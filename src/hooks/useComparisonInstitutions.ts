import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleElementInArray } from '../utils/misc';
import { setInstitutionRsposToCompare } from '../store/slices/comparisonSlice';
import { useProjectConfig } from '../api/projectConfig/projectConfigContext';

const useComparisonInstitutions = () => {
  const institutionRsposToCompare = useAppSelector(
    (state) => state.comparison.institutionRsposToCompare,
  );
  const dispatch = useAppDispatch();
  const { projectId } = useProjectConfig();
  const institutionRsposToComparePerProject = institutionRsposToCompare[projectId as string];

  return {
    institutionRsposToCompare: institutionRsposToComparePerProject,
    institutionsToCompareNumber: institutionRsposToComparePerProject.length,
    isInstitutionToCompare: (rspo: string) => institutionRsposToComparePerProject.includes(rspo),
    toggleIsInstitutionToCompare: (rspo: string) =>
      dispatch(
        setInstitutionRsposToCompare({
          projectID: projectId as string,
          rspos: toggleElementInArray(institutionRsposToComparePerProject, rspo),
        }),
      ),
  };
};

export default useComparisonInstitutions;
