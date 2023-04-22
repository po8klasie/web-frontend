import { FC, useMemo } from 'react';
import SchoolPageMenu from './SchoolPageMenu';
import schoolInfoSectionComponents from './schoolInfoSections/schoolInfoSections';
import { SchoolViewConfig } from '../../../config/types';
import { ISchoolData } from '../../../types';

interface SchoolPageContentProps {
  schoolViewConfig: SchoolViewConfig;
  school: ISchoolData;
}

const SchoolPageContent: FC<SchoolPageContentProps> = ({
  schoolViewConfig: { schoolInfoSections },
  school,
}) => {
  const sectionConfigs = useMemo(
    () => schoolInfoSections.map(({ sectionId }) => schoolInfoSectionComponents[sectionId]),
    [schoolInfoSections],
  );

  return (
    <div className="w-container mx-auto grid md:grid-cols-5">
      <div className="">
        <SchoolPageMenu sectionConfigs={sectionConfigs} />
      </div>
      <div className="col-span-4 pt-5">
        {sectionConfigs.map(({ SectionComponent, id }) => (
          <SectionComponent key={id} school={school} />
        ))}
      </div>
    </div>
  );
};

export default SchoolPageContent;
