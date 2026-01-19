import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schema } from './sanity/schema'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const config = defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Altzor Blog',
  apiVersion,
  plugins: [
    structureTool(),
    visionTool(),
    codeInput(),
  ],
  schema,
})
