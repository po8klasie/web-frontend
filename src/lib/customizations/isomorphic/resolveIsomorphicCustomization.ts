import { CustomizationNameT } from '../customizationName'
import { ISOMORPHIC_CUSTOMIZATION_GLOB } from './customizationGlob'
import resolveCustomization, {
    ResolveCustomizationOptions,
} from '../resolveCustomization'
import {
    CustomizationContext,
    useCustomizationCtx,
} from '../customizationContext'
import { lazy, useMemo } from 'react'

const resolveIsomorphicCustomization = (
    customization: CustomizationNameT,
    customizationCtx: CustomizationContext,
    options?: ResolveCustomizationOptions
) => {
    return resolveCustomization(
        ISOMORPHIC_CUSTOMIZATION_GLOB[customization],
        customizationCtx,
        options
    )
}

export const resolveComponentCustomization = async (
    customization: CustomizationNameT,
    customizationCtx: CustomizationContext
) => {
    return {
        default: await resolveIsomorphicCustomization(
            customization,
            customizationCtx
        ),
    }
}

export const useComponentCustomization = (
    customization: CustomizationNameT
) => {
    const customizationCtx = useCustomizationCtx()
    return useMemo(
        () =>
            lazy(() =>
                resolveComponentCustomization(customization, customizationCtx)
            ),
        [customizationCtx]
    )
}

export default resolveIsomorphicCustomization
