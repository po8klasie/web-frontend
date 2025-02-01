import fs from 'node:fs/promises'
import YAML from 'yaml'
import { projectConfigSchema } from './projectConfigSchema'
import * as path from 'path'

const DEFAULT_PROJECT_CONFIGS_DIR = './configs'
const PROJECT_CONFIGS_DIR_ENV_VAR = 'PROJECT_CONFIGS_DIR'

const POSSIBLE_EXTENSIONS = ['.config.yml', '.config.yaml']

const readProjectConfig = async (projectId: string) => {
    const projectConfigsDir =
        process.env[PROJECT_CONFIGS_DIR_ENV_VAR] || DEFAULT_PROJECT_CONFIGS_DIR

    let filename = null

    try {
        filename = await Promise.any(
            POSSIBLE_EXTENSIONS.map((ext) =>
                path.join(projectConfigsDir, `${projectId}${ext}`)
            ).map(async (filename: string) => {
                await fs.access(filename, fs.constants.R_OK)
                return filename
            })
        )
    } catch {
        throw new Error(
            `Project config file not found for project ID: ${projectId}`
        )
    }

    const file = await fs.readFile(filename, 'utf8')
    return projectConfigSchema.parse(YAML.parse(file))
}

export default readProjectConfig
