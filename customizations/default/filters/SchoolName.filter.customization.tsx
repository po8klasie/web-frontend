import { Search } from 'lucide-react'

const schoolNameFilter = {
    id: 'schoolName',
    filter:
        (schoolName) =>
        (schools, { ilike }) => {
            if (schoolName) {
                return ilike(schools.name, `%${schoolName}%`)
            }
            return undefined
        },
    components: {
        full: ({ value, setValue }) => {
            return (
                <div className="bg-[#F1F1F1] h-12 w-[60ch] px-4 py-2 rounded-md flex items-center">
                    <Search className="w-6 h-6" />
                    <input
                        type="text"
                        placeholder="Szukaj szkoły"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="ml-3 bg-transparent w-full h-full outline-none"
                    />
                </div>
            )
        },
        inline: ({ value, setValue }) => {
            return (
                <div className="bg-[#F1F1F1] h-12 w-[60ch] px-4 py-2 rounded-md flex items-center">
                    <Search className="w-6 h-6" />
                    <input
                        type="text"
                        placeholder="Szukaj szkoły"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="ml-3 bg-transparent w-full h-full outline-none"
                    />
                </div>
            )
        },
    },
    defaultValue: '',
}

export default schoolNameFilter
