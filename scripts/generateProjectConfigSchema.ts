import { projectConfigSchema } from '../src/lib/config/projectConfigSchema'
import { zodToJsonSchema } from 'zod-to-json-schema'
import fs from 'node:fs/promises'

const jsonSchema = zodToJsonSchema(projectConfigSchema, 'projectConfigSchema')

const filename = './projectConfigSchema.json'

fs.writeFile(filename, JSON.stringify(jsonSchema, null, 2)).then(() => {
    console.log(`Wrote JSON schema to ${filename}`)
})
