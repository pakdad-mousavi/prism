import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  dialect: 'sqlite',
  schema: './dist-electron/db/schema/*.sql.js',
});
