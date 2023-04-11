import { ComponentType, FC, MouseEventHandler, useEffect, useState } from 'react';
import { FilterProps } from './types';
import CollapsibleFilterWrapper from './CollapsibleFilterWrapper';
import { FiX } from '@react-icons/all-files/fi/FiX';
import dynamic from 'next/dynamic';
import { ReactTagsProps, Tag } from 'react-tag-input';
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import { availableExtendedSubjects } from '../../../../utils/apiDataMapping';
import styles from './styles/ExtendedSubjectsFilter.module.css';

// HACK(micorix): Bypass ES modules error
const ReactTags: ComponentType<ReactTagsProps> = dynamic(
  () => import('react-tag-input').then((mod) => mod.WithContext),
  { ssr: false },
);

type ExtendedSubjects = string[];
type OnCreateClassProfile = (extendedSubjects: ExtendedSubjects) => void;

const predefinedClassProfiles: ExtendedSubjects[] = [
  ['mat', 'fiz'],
  ['mat', 'inf'],
  ['biol', 'chem'],
  ['biol', 'chem', 'mat'],
  ['pol', 'hist'],
  ['pol', 'hist', 'wos'],
];

const suggestions: Tag[] = availableExtendedSubjects.map((subject) => ({
  id: subject,
  text: subject,
}));

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

interface CustomExtendedSubjectsInputProps {
  onCreateClassProfile: (extendedSubjects: ExtendedSubjects) => void;
}
const CustomExtendedSubjectsInput: FC<CustomExtendedSubjectsInputProps> = ({
  onCreateClassProfile,
}) => {
  const [tags, setTags] = useState<Tag[]>([]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleCreateProfileClick = () => {
    onCreateClassProfile(tags.map((tag) => tag.id));
  };

  return (
    <div className="">
      <ReactTags
        classNames={{
          tags: '',
          tag: 'bg-gray-200 rounded px-2 py-1 m-0.5 first:ml-0',
          remove: 'ml-2',
          tagInputField: 'outline-none',
          activeSuggestion: 'bg-gray-200 cursor-pointer',
          suggestions: styles.suggestions,
        }}
        tags={tags}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        allowDragDrop={false}
        inputFieldPosition="bottom"
        placeholder="Wpisz przedmiot rozszerzony"
        autocomplete
      />
      <div className="flex justify-center">
        <button
          className="mt-1 text-center block text-sm underline"
          onClick={handleCreateProfileClick}
        >
          Stwórz profil
        </button>
      </div>
    </div>
  );
};

interface ExtendedSubjectsListProps {
  onCreateCustomClick: MouseEventHandler;
  onCreateClassProfile: OnCreateClassProfile;
}

const ExtendedSubjectsList: FC<ExtendedSubjectsListProps> = ({
  onCreateCustomClick,
  onCreateClassProfile,
}) => (
  <div className="">
    <span className="text-center block text-sm">Wybierz z listy</span>
    <ul className="list-disc list-inside grid grid-cols-2">
      {predefinedClassProfiles.map((extendedSubjects) => (
        <li
          className="pl-2 hover:underline"
          role="button"
          onClick={() => onCreateClassProfile(extendedSubjects)}
          key={extendedSubjects.join('-')}
        >
          {extendedSubjects.join('-')}
        </li>
      ))}
    </ul>
    <div className="flex justify-center">
      <button className="text-center block text-sm underline" onClick={onCreateCustomClick}>
        lub stwórz własny{' '}
      </button>
    </div>
  </div>
);

interface ClassProfileInputProps {
  onCreateClassProfile: OnCreateClassProfile;
}
const ClassProfileInput: FC<ClassProfileInputProps> = ({ onCreateClassProfile }) => {
  const [isCustomSelectionActive, setIsCustomSelectionActive] = useState(false);

  const handleCreateCustomClick = () => {
    setIsCustomSelectionActive(true);
  };
  return (
    <div className="border p-1 rounded-b">
      {isCustomSelectionActive ? (
        <CustomExtendedSubjectsInput onCreateClassProfile={onCreateClassProfile} />
      ) : (
        <ExtendedSubjectsList
          onCreateClassProfile={onCreateClassProfile}
          onCreateCustomClick={handleCreateCustomClick}
        />
      )}
    </div>
  );
};

const buttonCommonClassName = 'flex items-center justify-center px-3 py-1 w-full mt-1';

interface ButtonProps {
  onClick: MouseEventHandler;
}
const AddProfileButton: FC<ButtonProps> = ({ onClick }) => (
  <button className={[buttonCommonClassName, 'rounded'].join(' ')} onClick={onClick}>
    <FiPlus />
    <span className="ml-1">Dodaj szukany profil klasy</span>
  </button>
);

const CancelAddingProfileButton: FC<ButtonProps> = ({ onClick }) => (
  <button className={[buttonCommonClassName, 'bg-red-200 rounded-t'].join(' ')} onClick={onClick}>
    <FiX />
    <span className="ml-1">Anuluj dodawanie profilu</span>
  </button>
);

interface ClassProfileChipProps {
  extendedSubjects: ExtendedSubjects;
  onRemove: MouseEventHandler;
}
const ClassProfileChip: FC<ClassProfileChipProps> = ({ extendedSubjects, onRemove }) => (
  <div className="border whitespace-nowrap px-2 m-0.5 rounded flex items-center">
    <span className="">{extendedSubjects.join('-')}</span>
    <button className="ml-1" onClick={onRemove}>
      <FiX className="w-3" />
    </button>
  </div>
);

const defaultValue: string[][] = [];

const ExtendedSubjectsFilter: FC<FilterProps<string>> = ({ value, setValue }) => {
  const [internalValue, setInternalValue] = useState<string[][]>(
    value ? JSON.parse(value) : defaultValue,
  );
  const [isAddingNewProfile, setIsAddingNewProfile] = useState(false);

  useEffect(() => {
    if (internalValue.length === 0) setValue('');
    else setValue(JSON.stringify(internalValue));
  }, [internalValue, setValue]);

  const handleCreateClassProfile = (extendedSubjects: ExtendedSubjects) => {
    const prepForComparison = (arr: string[]) => {
      const arrClone = [...arr];
      arrClone.sort();
      return arrClone.join('-');
    };

    setInternalValue((v) => {
      const extendedSubjectsForComparison = prepForComparison(extendedSubjects);
      const isDuplicate = v.some(
        (classProfile) => prepForComparison(classProfile) === extendedSubjectsForComparison,
      );

      if (isDuplicate) return v;

      return [...v, extendedSubjects];
    });
    setIsAddingNewProfile(false);
  };

  const removeClassProfileByIdx = (idx: number) => {
    setInternalValue((v) => v.filter((arr, i) => i !== idx));
  };

  return (
    <CollapsibleFilterWrapper title="Profile klas">
      <div className="flex flex-wrap">
        {internalValue.map((extendedSubjects, idx) => (
          <ClassProfileChip
            extendedSubjects={extendedSubjects}
            onRemove={() => removeClassProfileByIdx(idx)}
            key={extendedSubjects.join('-')}
          />
        ))}
      </div>
      {isAddingNewProfile ? (
        <CancelAddingProfileButton onClick={() => setIsAddingNewProfile(false)} />
      ) : (
        <AddProfileButton onClick={() => setIsAddingNewProfile(true)} />
      )}
      {isAddingNewProfile && <ClassProfileInput onCreateClassProfile={handleCreateClassProfile} />}
    </CollapsibleFilterWrapper>
  );
};

export default ExtendedSubjectsFilter;
