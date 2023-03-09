import { FC } from 'react';
import SchoolInfoSection from './SchoolInfoSection';
import { SectionComponentProps } from './types';
import { DataPresentGuard, SectionSubHeading, SimpleUnorderedList } from './reusableUI';

const CollaborationSection: FC<SectionComponentProps> = ({ school }) => {
  return (
    <SchoolInfoSection overwriteFooter="" id="collaboration" updateTime={new Date().toDateString()}>
      <div className="p-3">
        <h3 className="text-lg font-bold text-dark">Współpraca</h3>
        <div className="grid grid-cols-2">
          <div className="">
            <SectionSubHeading title="Współpraca z uczelniami" />
            <DataPresentGuard
              data={school.universityPartners}
              render={(data) => <SimpleUnorderedList items={data} />}
            />
          </div>
          <div className="gap-x-4">
            <SectionSubHeading title="Współpraca z NGO" />
            <DataPresentGuard
              data={school.ngoPartners}
              render={(data) => <SimpleUnorderedList items={data} />}
            />
          </div>
        </div>
      </div>
    </SchoolInfoSection>
  );
};

export default CollaborationSection;
