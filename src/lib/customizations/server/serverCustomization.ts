import resolveServerCustomization from './resolveServerCustomization'
import { CUSTOMIZATION_NAME } from '../customizationName'

const SERVER_CUSTOMIZATION = {
    [CUSTOMIZATION_NAME.DATA__FILTER_SCHOOLS]: resolveServerCustomization(
        CUSTOMIZATION_NAME.DATA__FILTER_SCHOOLS
    ),
    [CUSTOMIZATION_NAME.DATA__GET_SCHOOL]: resolveServerCustomization(
        CUSTOMIZATION_NAME.DATA__GET_SCHOOL
    ),
}

export default SERVER_CUSTOMIZATION
