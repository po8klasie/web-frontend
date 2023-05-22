import SchoolInfoSection from '../SchoolInfoSection';
import { BsCalendarCheck, BsCheckCircle } from 'react-icons/bs';
import { DataPresentGuard, ItemsList, SectionHeading, SectionSubHeading } from '../reusableUI';
import { fetchInstitutionDetails } from '../../../../../../api/institutionDetails/institutionDetails';
import { SchoolPageT } from '../../../../../../types';

const gridClassName = 'mt-3 grid md:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-4 text-gray';

const EducationalOfferSection: SchoolPageT = async ({ params: { rspo } }) => {
  const institutionDetails = await fetchInstitutionDetails(rspo);
  return (
    <SchoolInfoSection
      overwriteFooter=""
      id="educationalOffer"
      updateTime={new Date().toDateString()}
    >
      <div className="p-3">
        <SectionHeading title="Oferta edukacyjna" />
        <ItemsList
          items={institutionDetails.extracurricularActivities}
          icon={BsCheckCircle}
          title="Zajęcia dodatkowe"
          iconClassName="w-5 h-5"
          gridClassName={gridClassName}
        />
        <ItemsList
          items={institutionDetails.schoolEvents}
          icon={BsCalendarCheck}
          title="Wydarzenia szkolne"
          iconClassName="w-4 h-4"
          gridClassName={gridClassName}
        />
        <SectionSubHeading title="Liczba wycieczek szkolnych na rok" />
        <DataPresentGuard
          data={institutionDetails.noOfSchoolTripsPerYear}
          NAClassName="mt-3"
          render={(data) => <p className="mt-3">{data}</p>}
        />
      </div>
    </SchoolInfoSection>
  );
};

export default EducationalOfferSection;
