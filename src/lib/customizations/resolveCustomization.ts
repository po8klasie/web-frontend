import { CustomizationContext } from './customizationContext'

type ImportMetaGlobOutput = Record<string, () => unknown>

const CUSTOMIZATION_VARIANT_REGEX = /^\/customizations\/(\w+)\/.*/
const DEFAULT_CUSTOMIZATION_VARIANT_NAME = 'default'

export interface ResolveCustomizationOptions {
    multiple: boolean
}

const resolveCustomization = (
    availableCustomizationVariants: ImportMetaGlobOutput,
    customizationCtx: CustomizationContext,
    options: ResolveCustomizationOptions = {
        multiple: false,
    }
) => {
    const filenamesByVariants: Record<string, string[]> = {}

    Object.keys(availableCustomizationVariants).forEach((filename) => {
        const match = filename.match(CUSTOMIZATION_VARIANT_REGEX)
        const variantName = match ? match[1] : null

        if (!variantName) return

        if (!filenamesByVariants[variantName]) {
            filenamesByVariants[variantName] = [filename]
        }

        filenamesByVariants[variantName].push(filename)
    })

    const variantNames = Object.keys(filenamesByVariants)

    // Ensure there is always a default variant
    if (!variantNames.includes(DEFAULT_CUSTOMIZATION_VARIANT_NAME)) {
        throw new Error('Default customization variant is missing')
    }

    const customVariantName = customizationCtx.customizationVariant

    const chosenVariantName =
        customVariantName || DEFAULT_CUSTOMIZATION_VARIANT_NAME

    const resolverPromises = filenamesByVariants[chosenVariantName].map(
        (filename) => {
            const customizationResolver =
                availableCustomizationVariants[filename]
            return customizationResolver()
        }
    )

    if (!options.multiple) return resolverPromises[0]
    return Promise.all(resolverPromises)
}

export default resolveCustomization
