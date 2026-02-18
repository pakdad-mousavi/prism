import { sql } from 'drizzle-orm';
import { int } from 'drizzle-orm/sqlite-core';

export const createdAt = int('created_at', { mode: 'timestamp_ms' })
  .notNull()
  .default(sql`(unixepoch() * 1000)`);

export const updatedAt = int('updated_at', { mode: 'timestamp_ms' }).notNull();

export const completedAt = int('completed_at', { mode: 'timestamp_ms' })
  .notNull()
  .default(sql`(unixepoch() * 1000)`);
