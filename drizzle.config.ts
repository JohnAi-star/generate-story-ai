import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./config/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://story-generator-io_owner:09mZJlRXwnQT@ep-black-haze-a5u8n8m4.us-east-2.aws.neon.tech/Ai-Story?sslmode=require',
  },
  verbose: true,
  strict: true,
})