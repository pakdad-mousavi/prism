import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createdAt, updatedAt } from './columns.helpers.js';

export const syncQueue = sqliteTable('sync_queue', {
  id: int().primaryKey({ autoIncrement: true }),
  tableName: text('table_name', { enum: ['focus_run', 'mission', 'focus_run_pause', 'streak_day', 'user_local'] }).notNull(),
  rowId: int('row_id').notNull(),
  operation: text().notNull(),
  payload: text().notNull(),
  retryCount: int('retry_count', { mode: 'number' }).notNull().default(0),
  syncStatus: text({ enum: ['pending', 'synced'] })
    .notNull()
    .default('pending'),
  createdAt,
  updatedAt,
});
