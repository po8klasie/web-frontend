import React, { FC, MouseEventHandler, ReactNode, useState } from 'react'

const mainInstitutionTypes = [
    {
        rspoTypeId: '14',
        name: 'LO',
        icon: '🏫',
    },
    {
        rspoTypeId: '16',
        name: 'Technikum',
        icon: '🔧',
    },
    {
        rspoTypeId: '93',
        name: (
            <span>
                Szkoła branżowa <br /> I st.
            </span>
        ),
        icon: '💼',
    },
]

const extraInstitutionTypes = [
    {
        rspoTypeId: '90',
        name: 'Bednarska Szkoła Realna',
        icon: '📒',
    },
    {
        rspoTypeId: '17',
        name: 'Liceum ogólnokształcące uzupełniające dla absolwentów zasadniczych szkół zawodowych',
        icon: '💼',
    },
    {
        rspoTypeId: '15',
        name: 'Liceum profilowane',
        icon: '📓',
    },
    {
        rspoTypeId: '27',
        name: 'Liceum sztuk plastycznych',
        icon: '🎨',
    },
    {
        rspoTypeId: '24',
        name: 'Ogólnokształcąca szkoła muzyczna II stopnia',
        icon: '🎷',
    },
]

export const availableRspoInstitutionTypeIds: string[] = [
    ...mainInstitutionTypes.map((type) => type.rspoTypeId),
    ...extraInstitutionTypes.map((type) => type.rspoTypeId),
]

interface InstitutionTypeCardProps {
    name: ReactNode
    icon: string
    isActive: boolean
    onClick: MouseEventHandler
}

const InstitutionTypeCard: FC<InstitutionTypeCardProps> = ({
    name,
    icon,
    isActive,
    onClick,
}) => (
    <button
        className={[
            'border px-2 py-2 rounded-xl text-center',
            isActive ? 'bg-gray-100' : '',
        ].join(' ')}
        aria-checked={isActive}
        onClick={onClick}
    >
        <span className="text-2xl block">{icon}</span>
        <span className="block mt-2 text-sm leading-4">{name}</span>
    </button>
)

const HorizontalInstitutionTypeCard: FC<InstitutionTypeCardProps> = ({
    name,
    icon,
    isActive,
    onClick,
}) => (
    <button
        className={[
            'flex items-center border px-2 py-1 rounded-xl text-center',
            isActive ? 'bg-gray-100' : '',
        ].join(' ')}
        aria-checked={isActive}
        onClick={onClick}
    >
        <span className="text-xl block">{icon}</span>
        <span className="block w-full text-center text-sm leading-4">
            {name}
        </span>
    </button>
)

const toggleInArray = (array: string[], value: string) => {
    if (array.includes(value)) {
        return array.filter((item) => item !== value)
    }
    return [...array, value]
}

const InstitutionTypeFilter = ({ value: rawValue, setValue }) => {
    const [shouldShowMore, setShouldShowMore] = useState(false)
    const value = Array.isArray(rawValue) ? rawValue : [rawValue]
    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                {mainInstitutionTypes.map(({ rspoTypeId, name, icon }) => (
                    <InstitutionTypeCard
                        key={rspoTypeId}
                        name={name}
                        icon={icon}
                        isActive={value.includes(rspoTypeId)}
                        onClick={() =>
                            setValue(toggleInArray(value, rspoTypeId))
                        }
                    />
                ))}
            </div>
            <div className="mt-1 mb-2">
                <button
                    className="text-sm"
                    onClick={() => setShouldShowMore((should) => !should)}
                >
                    Pokaż
                    {shouldShowMore ? ' mniej ' : ' więcej '}
                    typów szkół
                </button>
            </div>
            {shouldShowMore && (
                <div className="grid gap-y-1">
                    {extraInstitutionTypes.map(({ rspoTypeId, name, icon }) => (
                        <HorizontalInstitutionTypeCard
                            key={rspoTypeId}
                            name={name}
                            icon={icon}
                            isActive={value.includes(rspoTypeId)}
                            onClick={() =>
                                setValue(toggleInArray(value, rspoTypeId))
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

const institutionTypeFilter = {
    id: 'rspo_institution_type',
    filter:
        (rawValue) =>
        (schools, { inArray }) => {
            if (!rawValue) return undefined
            const value = Array.isArray(rawValue) ? rawValue : [rawValue]

            console.log(value, 'institution type')
            if (value.length > 0) {
                return inArray(schools.rspo_institution_type, value)
            }
            return undefined
        },
    components: {
        full: InstitutionTypeFilter,
    },
    defaultValue: [],
}

export default institutionTypeFilter
