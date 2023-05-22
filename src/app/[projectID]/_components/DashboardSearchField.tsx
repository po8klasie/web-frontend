'use client'

import SearchField from "../../../components/SearchField";
import { useRouter } from "next/navigation";
import { PROJECT_PAGES } from "../../../utils/projectLinksHelpers";
import { useProjectConfig } from "../../../api/projectConfig/projectConfigContext";

const DashboardSearchField = () => {
  const router = useRouter();
  const {projectId} = useProjectConfig()

  const handleSubmit = (query: string) => {
    router.push(`/${projectId}/${PROJECT_PAGES.MAP_SEARCH_PAGE}?query=${query}`);
  };

  return (
    <SearchField
      className="w-full rounded-xl"
      onSubmit={handleSubmit}
    />
  )
}

export default DashboardSearchField
