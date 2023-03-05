import { createContext, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const selectedSchoolContext = createContext();

export const SelectedSchoolProvider = ({ children }) => {
  const [selectedSchoolRspo, setSelectedSchoolRspo] = useState<string | null>(null);
  return (
    <selectedSchoolContext.Provider value={{ selectedSchoolRspo, setSelectedSchoolRspo }}>
      {children}
    </selectedSchoolContext.Provider>
  );
};

export const useSelectedSchool = () => {
  const { selectedSchoolRspo, setSelectedSchoolRspo } = useContext(selectedSchoolContext);
  const { data } = useQuery([`/search/institution/${selectedSchoolRspo}`], {
    enabled: !!selectedSchoolRspo,
  });

  return {
    setSelectedSchoolRspo,
    selectedSchoolRspo,
    selectedSchool: data ?? null,
  };
};
