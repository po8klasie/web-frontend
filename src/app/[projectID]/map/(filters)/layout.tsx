
import { fetchProjectConfig } from "../../../../api/projectConfig/projectConfig";
import { ProjectPageT } from "../../../../types";
import FiltersWrapper from "./_components/FiltersWrapper";

const Filters: ProjectPageT = async ({params, ...props}) => {
  const {searchViewConfig: {filters}} = await fetchProjectConfig(params.projectID)
  const filtersComponents = filters.map(({component}) => (
    props[component]
  ))

  return (
    <FiltersWrapper>
      <div className="px-2">
        {filtersComponents}
      </div>
    </FiltersWrapper>
  )
}

export default Filters
