import {
    BedIcon,
    BusIcon,
    ChartColumnBig,
    ChartNoAxesColumnIncreasing,
    FileCheck2,
    FlagIcon,
    HandHeart,
    InfoIcon,
    RulerIcon,
    SchoolIcon,
    UniversityIcon,
} from 'lucide-react'

const filterCategories = [
    {
        id: 'noop',
        icon: () => null,
        title: null,
    },
    {
        id: 'general',
        icon: InfoIcon,
        title: 'Ogólne',
    },
    {
        id: 'classProfile',
        icon: RulerIcon,
        title: 'Profil klasy',
    },
    {
        id: 'publicTransport',
        icon: BusIcon,
        title: 'Komunikacja miejska',
    },
    {
        id: 'foreignLanguages',
        icon: FlagIcon,
        title: 'Języki obce',
    },
    {
        id: 'universityCooperation',
        icon: UniversityIcon,
        title: 'Współpraca z uczelniami',
    },
    {
        id: 'dormitoriesAndInternet',
        icon: BedIcon,
        title: 'Bursy i internety',
    },
    {
        id: 'zwztRanking',
        icon: HandHeart,
        title: 'Zwolnieni z Teorii',
    },
    {
        id: 'thresholdPoints',
        icon: ChartNoAxesColumnIncreasing,
        title: 'Próg punktowy',
    },
    {
        id: 'examResults',
        icon: FileCheck2,
        title: 'Wyniki egzaminów',
    },
    {
        id: 'ewd',
        icon: ChartColumnBig,
        title: 'Edukacyjna wartość dodana',
    },
]

export default filterCategories
