import { CustomizationNameT } from '../customizationName'
import { SERVER_CUSTOMIZATION_GLOB } from './customizationGlob'
import resolveCustomization from '../resolveCustomization'
import { CustomizationContext } from '../customizationContext'

const resolveServerCustomization = (
    customization: CustomizationNameT,
    customizationCtx: CustomizationContext
) => {
    return resolveCustomization(
        SERVER_CUSTOMIZATION_GLOB[customization],
        customizationCtx
    )
}

export default resolveServerCustomization
