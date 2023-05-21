import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { ISchoolOverview } from '../types';

interface ISelectedSchoolContextValue {
  selectedSchoolRspo: string | null;
  setSelectedSchoolRspo: Dispatch<SetStateAction<string | null>>;
}

const selectedSchoolContext = createContext<ISelectedSchoolContextValue>({
  selectedSchoolRspo: null,
  setSelectedSchoolRspo: () => {
    /* noop */
  },
});

export const SelectedSchoolProvider: FC<PropsWithChildren<Record<string, never>>> = ({
  children,
}) => {
  const [selectedSchoolRspo, setSelectedSchoolRspo] = useState<string | null>(null);
  return (
    <selectedSchoolContext.Provider value={{ selectedSchoolRspo, setSelectedSchoolRspo }}>
      {children}
    </selectedSchoolContext.Provider>
  );
};

export const useSelectedSchool = () => {
  const { selectedSchoolRspo, setSelectedSchoolRspo } = useContext(selectedSchoolContext);
  const { data } = useQuery<ISchoolOverview>([`/search/institution/${selectedSchoolRspo}`], {
    enabled: !!selectedSchoolRspo,
  });

  return {
    setSelectedSchoolRspo,
    selectedSchoolRspo,
    selectedSchool: data ?? null,
  };
};
