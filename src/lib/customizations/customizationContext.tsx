import readProjectConfig from '../config/readProjectConfig'
import type { ProjectConfig } from '../config/projectConfigSchema'
import { Params } from 'react-router'
import { createContext, useContext } from 'react'

export interface CustomizationContext {
    projectId: string
    customizationVariant: string | 'default'
    projectConfig: ProjectConfig
}

export const getCustomizationCtxFromProjectId = async (
    projectId: string
): Promise<CustomizationContext> => {
    const projectConfig = await readProjectConfig(projectId)
    return {
        projectId,
        customizationVariant: projectConfig.customizationVariant,
        projectConfig,
    }
}

export const getCustomizationCtxFromParams = (
    params: Params
): Promise<CustomizationContext> => {
    return getCustomizationCtxFromProjectId(params.projectId as string)
}

export const CustomizationCtxReactContext =
    createContext<CustomizationContext | null>(null)

export const useCustomizationCtx = () => {
    try {
        return useContext(CustomizationCtxReactContext)
    } catch {
        return null
    }
}
