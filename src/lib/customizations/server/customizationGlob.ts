import { CUSTOMIZATION_NAME } from '../customizationName'

export const SERVER_CUSTOMIZATION_GLOB = {
    [CUSTOMIZATION_NAME.DATA__FILTER_SCHOOLS]: import.meta.glob(
        '@customizations/*/data/**/filterSchools.customization.server.ts',
        {
            import: 'default',
        }
    ),
    [CUSTOMIZATION_NAME.DATA__GET_SCHOOL]: import.meta.glob(
        '@customizations/*/data/**/getSchool.customization.server.ts',
        {
            import: 'default',
        }
    ),
}
