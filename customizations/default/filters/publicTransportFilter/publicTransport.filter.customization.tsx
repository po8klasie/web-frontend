import { FC } from 'react'
import {
    BusIcon,
    TrainFrontIcon,
    TrainFrontTunnelIcon,
    TramFrontIcon,
} from 'lucide-react'
import _ from 'lodash'

const stationTypes = [
    {
        id: 'trolleybus',
        name: 'Przystanek trolejbusów',
        icon: BusIcon,
    },
    {
        id: 'bus',
        name: 'Przystanek autobusowy',
        icon: BusIcon,
    },
    {
        id: 'tram',
        name: 'Przystanek tramwajowy',
        icon: TramFrontIcon,
    },
    {
        id: 'train',
        name: 'Stacja pociągu',
        icon: TrainFrontIcon,
    },
    {
        id: 'subway',
        name: 'Stacja metra',
        icon: TrainFrontTunnelIcon,
    },
]

const PublicTransportFilter = ({ value: rawValue, setValue }) => {
    const value = Array.isArray(rawValue) ? rawValue : [rawValue]

    const handleChange = (id: string) => {
        setValue(_.xor(value, [id]))
    }

    return (
        <div>
            <span className="mb-1 block">
                {'<'}250m od szkoły znajduje się:
            </span>
            <ul>
                {stationTypes.map(({ name, id, icon: Icon }) => (
                    <li>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                onChange={() => handleChange(id)}
                                checked={value.includes(id)}
                                className="bg-primary focus:ring-primary rounded"
                            />
                            <Icon className="mx-1 text-gray-600" />
                            <span className="">{name}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const publicTransportFilter = {
    id: 'public_transport',
    filter:
        (rawValue) =>
        (schools, { inArray }) => {
            if (!rawValue) return undefined
            const value = Array.isArray(rawValue) ? rawValue : [rawValue]

            // if (value.length > 0) {
            //   return inArray(schools.rspo_institution_type, value)
            // }
            return undefined
        },
    components: {
        full: PublicTransportFilter,
    },
    defaultValue: [],
}

export default publicTransportFilter
