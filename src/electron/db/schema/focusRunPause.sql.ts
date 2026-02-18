import { int, sqliteTable } from 'drizzle-orm/sqlite-core';
import { focusRun } from './focusRun.sql.js';

export const focusRunPause = sqliteTable('focus_run_pause', {
  id: int().primaryKey({ autoIncrement: true }),
  runId: int('run_id')
    .notNull()
    .references(() => focusRun.id, { onDelete: 'cascade' }),
  pausedAt: int('paused_at', { mode: 'timestamp_ms' }).notNull(),
  resumedAt: int('resumed_at', { mode: 'timestamp_ms' }),
});
