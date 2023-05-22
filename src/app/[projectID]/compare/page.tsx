'use client';

import { SchoolCardPlaceholder } from '../../../components/SchoolCard';
import { nanoid } from 'nanoid';
import useComparisonInstitutionsQuery from './_hooks/useComparisonInstitutions';
import { ComparisonInstitutionI, PropertiesMaxLengthsI } from './_components/types';
import EmptyComparisonMessage from './_components/EmptyComparisonMessage';
import ComparisonInstitutionsListing from './_components/ComparisonInstitutionsListing';

const getClassesMaxNo = (data: ComparisonInstitutionI[] | undefined): number => {
  if (!data) return 0;
  const classesNoPerInstitution = data.map((institution) => institution.comparison.classes.length);
  return Math.max(...classesNoPerInstitution);
};

const Page = () => {
  const { data, isLoading } = useComparisonInstitutionsQuery();
  const classesMaxNo = getClassesMaxNo(data);
  const propertiesMaxLengths: PropertiesMaxLengthsI = {
    classes: classesMaxNo,
  };

  const isComparisonEmpty = !isLoading && data && data.length === 0;
  const isComparisonAvailable = !isLoading && data && data.length > 0;

  return (
    <div className="w-11/12 sm:w-4/5 mx-auto mt-10 h-full">
      <h1 className="text-center font-primary text-2xl text-bold">Porównaj szkoły</h1>
      {isComparisonAvailable && (
        <div className="flex justify-center mt-4">
          <span className="bg-primaryBg text-primary px-2 py-1 rounded text-sm">
            Podobieństwa między wszystkimi szkołami
          </span>
        </div>
      )}
      <div className="mt-5">
        {isComparisonEmpty && <EmptyComparisonMessage />}
        {isComparisonAvailable && (
          <ComparisonInstitutionsListing
            institutions={data as ComparisonInstitutionI[]}
            propertiesMaxLengths={propertiesMaxLengths}
          />
        )}
        {isLoading &&
          new Array(3).fill(0).map(() => (
            <div className="p-1" key={nanoid()}>
              <SchoolCardPlaceholder />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
