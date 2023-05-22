'use client';

import { FiX } from '@react-icons/all-files/fi/FiX';
import { useSelectedSchool } from "../../../../hooks/useSelectedSchool";
import SchoolCard from "../../../../components/SchoolCard";

const SelectedSchoolCard = () => {
  const { selectedSchool, setSelectedSchoolRspo } = useSelectedSchool();

  if (!selectedSchool) return null;

  return (
    <div className="pb-10">
      <div className="flex justify-between px-1 mb-1">
        <span className="text-gray">Wybrana szkoła:</span>
        <button className="">
          <FiX className="text-gray text-lg" onClick={() => setSelectedSchoolRspo(null)} />
        </button>
      </div>
      <SchoolCard school={selectedSchool} highlighted={true} />
    </div>
  );
};

export default SelectedSchoolCard;
