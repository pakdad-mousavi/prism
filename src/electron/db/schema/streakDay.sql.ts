import { int, sqliteTable } from 'drizzle-orm/sqlite-core';
import { focusRun } from './focusRun.sql.js';
import { createdAt, updatedAt } from './columns.helpers.js';

export const streakDay = sqliteTable('streak_day', {
  day: int('day', { mode: 'timestamp_ms' }).notNull().primaryKey(),
  focusedMinutes: int('focused_minutes', { mode: 'number' }).notNull().default(0),
  runCount: int('run_count', { mode: 'number' }).notNull().default(0),
  lastRunId: int('last_run_id').references(() => focusRun.id, { onDelete: 'set null' }),
  createdAt,
  updatedAt,
});
