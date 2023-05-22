import { AiOutlineCheck } from "@react-icons/all-files/ai/AiOutlineCheck";
import { fetchInstitutionDetails } from "../../../../../../api/institutionDetails/institutionDetails";
import ClassProfiles from "./ClassProfiles";
import { ClassEntriesT } from "./types";
import { FC } from "react";
import { SchoolPageT } from "../../../../../../types";
import SchoolInfoSection from "../SchoolInfoSection";
import { IInstitutionDetails } from "../types";

const prepareClassEntries = (institutionDetails: IInstitutionDetails): ClassEntriesT => {
  const { classes } = institutionDetails;
  const entries = Object.entries(classes);
  entries.sort();
  entries.reverse();
  return entries;
};

const ClassesDataInfo: FC = () => (
  <span
    role="alert"
    className="bg-blue-100 border-l-4 border-blue-600 p-1 rounded block text-sm mt-2"
  >
    <AiOutlineCheck className="inline-block text-xl text-blue-600 translate-y-[-2px] mr-1" />
    Dokładamy wszelkich starań, aby dane, które prezentujemy były dokładne. Pamiętaj jednak, aby
    sprawdzić wybrany profil szkoły z oficjalną ofertą szkoły.
  </span>
);

const ClassProfilesSection: SchoolPageT = async ({ params: { rspo } }) => {
  const institutionDetails = await fetchInstitutionDetails(rspo);
  const classesEntries = prepareClassEntries(institutionDetails);
  const isClassesDataAvailable = classesEntries.length > 0;

  return (
    <SchoolInfoSection id="classProfiles" updateTime={new Date(2023, 5, 9)}>
      <div className="p-3">
        <h3 className="text-lg font-bold text-dark mr-5">Profile klas</h3>
        <ClassesDataInfo />
      </div>
      {isClassesDataAvailable ? (
        <ClassProfiles classesEntries={classesEntries} />
      ) : (
        <p className="m-3">Brak danych</p>
      )}
    </SchoolInfoSection>
  );
};

export default ClassProfilesSection;
