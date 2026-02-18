import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createdAt } from './columns.helpers.js';
import { mission } from './mission.sql.js';

export const focusRun = sqliteTable('focus_run', {
  id: int().primaryKey({ autoIncrement: true }),
  missionId: int('mission_id').references(() => mission.id, { onDelete: 'set null' }),
  createdAt,
  startedAt: int('started_at', { mode: 'timestamp_ms' }).notNull(),
  endedAt: int('ended_at', { mode: 'timestamp_ms' }),
  plannedMinutes: int('planned_minutes', { mode: 'number' }).notNull(),
  status: text({ enum: ['running', 'paused', 'completed', 'abandoned'] })
    .notNull()
    .default('running'),
  deviceId: text('device_id').notNull(),
  offlineCreated: int('offline_created', { mode: 'boolean' }).notNull(),
  syncStatus: text('sync_status', { enum: ['pending', 'synced'] }).default('pending'),
});
