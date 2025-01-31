import fs from 'node:fs/promises'
import YAML from 'yaml'
import { projectConfigSchema } from './projectConfigSchema'

const readProjectConfig = async (projectId: string) => {
    const filename = `./configs/${projectId}.config.yml`
    if (!(await fs.stat(filename))) {
        throw new Error(`Project config not found for project ID: ${projectId}`)
    }
    const file = await fs.readFile(filename, 'utf8')
    return projectConfigSchema.parse(YAML.parse(file))
}

export default readProjectConfig
