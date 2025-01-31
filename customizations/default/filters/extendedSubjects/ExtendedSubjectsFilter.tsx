import {
    ComponentType,
    FC,
    MouseEventHandler,
    useEffect,
    useState,
} from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import styles from './styles/ExtendedSubjectsFilter.module.css'
import { PlusIcon, XIcon } from 'lucide-react'
import { normalizeInitialValue } from './filterValueSchema'

type ExtendedSubjects = string[]
type OnCreateClassProfile = (extendedSubjects: ExtendedSubjects) => void

const predefinedClassProfiles: ExtendedSubjects[] = [
    ['mat', 'fiz'],
    ['mat', 'inf'],
    ['biol', 'chem'],
    ['biol', 'chem', 'mat'],
    ['pol', 'hist'],
    ['pol', 'hist', 'wos'],
]

const KeyCodes = {
    comma: 188,
    enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

interface CustomExtendedSubjectsInputProps {
    onCreateClassProfile: (extendedSubjects: ExtendedSubjects) => void
}
const CustomExtendedSubjectsInput: FC<CustomExtendedSubjectsInputProps> = ({
    onCreateClassProfile,
}) => {
    const [tags, setTags] = useState<any[]>([])
    const suggestionsData = []
    // const { data: suggestionsData } = useAPIQuery<string[]>(
    //   [`/institution-classes/extended-subjects`],
    //   {
    //     placeholderData: [],
    //     refetchInterval: false,
    //   },
    // );
    const suggestions = (suggestionsData as string[]).map((subject) => ({
        id: subject,
        text: subject,
    }))

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i))
    }

    const handleAddition = (tag) => {
        setTags([...tags, tag])
    }

    const handleCreateProfileClick = () => {
        onCreateClassProfile(tags.map((tag) => tag.id))
    }

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
    )
}

interface ExtendedSubjectsListProps {
    onCreateCustomClick: MouseEventHandler
    onCreateClassProfile: OnCreateClassProfile
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
            <button
                className="text-center block text-sm underline"
                onClick={onCreateCustomClick}
            >
                lub stwórz własny{' '}
            </button>
        </div>
    </div>
)

interface ClassProfileInputProps {
    onCreateClassProfile: OnCreateClassProfile
}
const ClassProfileInput: FC<ClassProfileInputProps> = ({
    onCreateClassProfile,
}) => {
    const [isCustomSelectionActive, setIsCustomSelectionActive] =
        useState(false)

    const handleCreateCustomClick = () => {
        setIsCustomSelectionActive(true)
    }
    return (
        <div className="border p-1 rounded-b">
            {isCustomSelectionActive ? (
                <CustomExtendedSubjectsInput
                    onCreateClassProfile={onCreateClassProfile}
                />
            ) : (
                <ExtendedSubjectsList
                    onCreateClassProfile={onCreateClassProfile}
                    onCreateCustomClick={handleCreateCustomClick}
                />
            )}
        </div>
    )
}

const buttonCommonClassName =
    'flex items-center justify-center px-3 py-1 w-full mt-1'

interface ButtonProps {
    onClick: MouseEventHandler
}
const AddProfileButton: FC<ButtonProps> = ({ onClick }) => (
    <button
        className={[buttonCommonClassName, 'rounded'].join(' ')}
        onClick={onClick}
    >
        <PlusIcon />
        <span className="ml-1">Dodaj szukany profil klasy</span>
    </button>
)

const CancelAddingProfileButton: FC<ButtonProps> = ({ onClick }) => (
    <button
        className={[buttonCommonClassName, 'bg-red-200 rounded-t'].join(' ')}
        onClick={onClick}
    >
        <XIcon />
        <span className="ml-1">Anuluj dodawanie profilu</span>
    </button>
)

interface ClassProfileChipProps {
    extendedSubjects: ExtendedSubjects
    onRemove: MouseEventHandler
}
const ClassProfileChip: FC<ClassProfileChipProps> = ({
    extendedSubjects,
    onRemove,
}) => (
    <div className="border whitespace-nowrap px-2 m-0.5 rounded flex items-center">
        <span className="">{extendedSubjects.join('-')}</span>
        <button className="ml-1" onClick={onRemove}>
            <XIcon className="w-3" />
        </button>
    </div>
)

const ExtendedSubjectsFilter: FC = ({ value, setValue }) => {
    const [internalValue, setInternalValue] = useState<string[][]>(
        normalizeInitialValue(value)
    )
    const [isAddingNewProfile, setIsAddingNewProfile] = useState(false)

    useEffect(() => {
        if (internalValue.length === 0) setValue('')
        else setValue(JSON.stringify(internalValue))
        // TODO(micorix): Wrap setValue and it's dependencies with useCallbacks
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [internalValue])

    const handleCreateClassProfile = (extendedSubjects: ExtendedSubjects) => {
        const prepForComparison = (arr: string[]) => {
            const arrClone = [...arr]
            arrClone.sort()
            return arrClone.join('-')
        }

        setInternalValue((v) => {
            const extendedSubjectsForComparison =
                prepForComparison(extendedSubjects)
            const isDuplicate = v.some(
                (classProfile) =>
                    prepForComparison(classProfile) ===
                    extendedSubjectsForComparison
            )

            if (isDuplicate) return v

            return [...v, extendedSubjects]
        })
        setIsAddingNewProfile(false)
    }

    const removeClassProfileByIdx = (idx: number) => {
        setInternalValue((v) => v.filter((arr, i) => i !== idx))
    }

    return (
        <div>
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
                <CancelAddingProfileButton
                    onClick={() => setIsAddingNewProfile(false)}
                />
            ) : (
                <AddProfileButton onClick={() => setIsAddingNewProfile(true)} />
            )}
            {isAddingNewProfile && (
                <ClassProfileInput
                    onCreateClassProfile={handleCreateClassProfile}
                />
            )}
        </div>
    )
}

export default ExtendedSubjectsFilter
