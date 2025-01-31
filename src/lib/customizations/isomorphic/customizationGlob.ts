import { CUSTOMIZATION_NAME } from '../customizationName'

export const ISOMORPHIC_CUSTOMIZATION_GLOB = {
    [CUSTOMIZATION_NAME.FILTERS__FILTER_CATEGORIES]: import.meta.glob(
        '@customizations/*/filters/**/filterCategories.customization.ts',
        {
            import: 'default',
        }
    ),
    [CUSTOMIZATION_NAME.FILTERS__FILTER_DEFINITIONS]: import.meta.glob(
        '@customizations/*/filters/**/*.filter.customization.tsx',
        {
            import: 'default',
        }
    ),
    [CUSTOMIZATION_NAME.SCHOOL_PAGE_SECTIONS__SECTIONS]: import.meta.glob(
        '@customizations/*/schoolPageSections/**/*.schoolPageSection.customization.tsx',
        {
            import: 'default',
        }
    ),
    [CUSTOMIZATION_NAME.COMPONENTS__SCHOOL_CARD]: import.meta.glob(
        '@customizations/*/components/**/SchoolCard.customization.tsx',
        {
            import: 'default',
        }
    ),
    [CUSTOMIZATION_NAME.COMPONENTS__SCHOOL_HERO]: import.meta.glob(
        '@customizations/*/components/**/SchoolHero.customization.tsx',
        {
            import: 'default',
        }
    ),
}
