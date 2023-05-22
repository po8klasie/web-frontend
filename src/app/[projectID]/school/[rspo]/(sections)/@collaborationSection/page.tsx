import SchoolInfoSection from '../SchoolInfoSection';
import { DataPresentGuard, SectionSubHeading, SimpleUnorderedList } from '../reusableUI';
import { fetchInstitutionDetails } from "../../../../../../api/institutionDetails/institutionDetails";
import { SchoolPageT } from "../../../../../../types";

const CollaborationSection: SchoolPageT = async ({ params: {rspo} }) => {
  const institutionDetails = await fetchInstitutionDetails(rspo)
  return (
    <SchoolInfoSection overwriteFooter="" id="collaboration" updateTime={new Date().toDateString()}>
      <div className="p-3">
        <h3 className="text-lg font-bold text-dark">Współpraca</h3>
        <div className="grid grid-cols-2">
          <div className="">
            <SectionSubHeading title="Współpraca z uczelniami" />
            <DataPresentGuard
              data={institutionDetails.universityPartners}
              render={(data) => <SimpleUnorderedList items={data} />}
            />
          </div>
          <div className="gap-x-4">
            <SectionSubHeading title="Współpraca z NGO" />
            <DataPresentGuard
              data={institutionDetails.ngoPartners}
              render={(data) => <SimpleUnorderedList items={data} />}
            />
          </div>
        </div>
      </div>
    </SchoolInfoSection>
  );
};

export default CollaborationSection;
