import { FC } from 'react';
import SchoolInfoSection from './SchoolInfoSection';
import { SectionComponentProps } from './types';
import { BsCalendarCheck, BsCheckCircle } from 'react-icons/bs';
import { DataPresentGuard, ItemsList, SectionHeading, SectionSubHeading } from './reusableUI';

const gridClassName = 'mt-3 grid md:grid-cols-2 xl:grid-cols-3 gap-x-2 gap-y-4 text-gray';

const EducationalOfferSection: FC<SectionComponentProps> = ({ school }) => {
  return (
    <SchoolInfoSection
      overwriteFooter=""
      id="educationalOffer"
      updateTime={new Date().toDateString()}
    >
      <div className="p-3">
        <SectionHeading title="Oferta edukacyjna" />
        <ItemsList
          items={school.extracurricularActivities}
          icon={BsCheckCircle}
          title="Zajęcia dodatkowe"
          iconClassName="w-5 h-5"
          gridClassName={gridClassName}
        />
        <ItemsList
          items={school.schoolEvents}
          icon={BsCalendarCheck}
          title="Wydarzenia szkolne"
          iconClassName="w-4 h-4"
          gridClassName={gridClassName}
        />
        <SectionSubHeading title="Liczba wycieczek szkolnych na rok" />
        <DataPresentGuard
          data={school.noOfSchoolTripsPerYear}
          NAClassName="mt-3"
          render={(data) => <p className="mt-3">{data}</p>}
        />
      </div>
    </SchoolInfoSection>
  );
};

export default EducationalOfferSection;
