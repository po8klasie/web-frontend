import { FC } from 'react';
import SchoolInfoSection from '../SchoolInfoSection';
import { MdOutlineSportsBasketball } from 'react-icons/md';
import { GiSoccerField } from '@react-icons/all-files/gi/GiSoccerField';
import { ItemsList } from '../reusableUI';
import { fetchInstitutionDetails } from "../../../../../../api/institutionDetails/institutionDetails";

const gridClassName = 'mt-3 grid md:grid-cols-2 xl:grid-cols-4 gap-x-2 gap-y-4';

const SportSection = async ({ params: {rspo} }) => {
  const institutionDetails = await fetchInstitutionDetails(rspo)
  return (
    <SchoolInfoSection overwriteFooter="" id="sport" updateTime={new Date().toDateString()}>
      <div className="p-3">
        <h3 className="text-lg font-bold text-dark">Sport</h3>
        <ItemsList
          items={institutionDetails.sportActivities}
          icon={MdOutlineSportsBasketball}
          title="Zajęcia sportowe"
          iconClassName="w-5 h-5"
          gridClassName={gridClassName}
        />
        <ItemsList
          items={institutionDetails.sportInfrastructure}
          icon={GiSoccerField}
          title="Infrastruktura sportowa"
          iconClassName="w-5 h-5"
          gridClassName={gridClassName}
        />
      </div>
    </SchoolInfoSection>
  );
};

export default SportSection;
