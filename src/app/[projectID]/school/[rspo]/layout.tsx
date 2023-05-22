import { fetchInstitutionDetails } from "../../../../api/institutionDetails/institutionDetails";
import SchoolHero from "./_components/SchoolHero";

import { getSectionConfigs } from "./(sections)/institutionDetailsSections";
import SchoolPageMenu from "./_components/SchoolPageMenu";
import { SchoolPageT } from "../../../../types";

const SchoolPage: SchoolPageT = async (props) => {
  const institutionDetails = await fetchInstitutionDetails(props.params.rspo)
  const sectionConfigs = await getSectionConfigs(props.params.projectID)
  return (
    <div>
      <SchoolHero institutionDetails={institutionDetails} />
      <div className="w-container mx-auto grid md:grid-cols-5">
        <div className="">
          <SchoolPageMenu sectionConfigs={sectionConfigs} />
        </div>
        <div className="col-span-4 pt-5">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default SchoolPage
