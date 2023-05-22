import { getSectionConfigs, InstitutionDetailsSectionId } from "./institutionDetailsSections";
import { IProjectPageParams, NextAppRouterPageWithParamsT, SchoolPageT } from "../../../../../types";

type InstitutionDetailsSectionParallelRoutes = Record<`${InstitutionDetailsSectionId}Section`, SchoolPageT>

const Layout: NextAppRouterPageWithParamsT<IProjectPageParams, InstitutionDetailsSectionParallelRoutes> = async ({params, ...props}) => {
  const sectionConfigs = await getSectionConfigs(params.projectID)
  const sections = sectionConfigs.map(({id}) => (
    props[`${id as InstitutionDetailsSectionId}Section`]
  ))

  return (
    <div>
      {sections}
    </div>
  );
}

export default Layout
