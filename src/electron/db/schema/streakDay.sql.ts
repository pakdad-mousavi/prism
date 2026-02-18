import { index, int, sqliteTable } from 'drizzle-orm/sqlite-core';
import { focusRun } from './focusRun.sql.js';
import { createdAt, updatedAt } from './columns.helpers.js';

export const streakDay = sqliteTable(
  'streak_day',
  {
    day: int('day', { mode: 'timestamp_ms' }).notNull().primaryKey(),
    focusedMinutes: int('focused_minutes', { mode: 'number' }).notNull(),
    runCount: int('run_count', { mode: 'number' }).notNull(),
    lastRunId: int('last_run_id').references(() => focusRun.id, { onDelete: 'set null' }),
    heatmapLevel: int('heatmap_level', { mode: 'number' }).notNull().default(0),
    createdAt,
    updatedAt,
  },
  (table) => [index('idx_streak_updated').on(table.updatedAt)],
);
