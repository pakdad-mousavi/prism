import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { campaign } from './campaign.sql.js';
import { completedAt, createdAt, updatedAt } from './columns.helpers.js';

export const mission = sqliteTable('mission', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: text(),
  scale: text({ enum: ['task', 'operation'] }).notNull(),
  campaignId: int('campaign_id', { mode: 'number' }).references(() => campaign.id, { onDelete: 'set null' }),
  isAutoMission: int('is_auto_mission', { mode: 'boolean' }).notNull(),
  estimatedMinutes: int('estimated_minutes', { mode: 'number' }),
  targetSessions: int('target_sessions', { mode: 'number' }),
  completedSessions: int('completed_sessions', { mode: 'number' }).default(0),
  priority: int({ mode: 'number' }).default(0),
  status: text({ enum: ['active', 'on hold', 'completed', 'archived'] })
    .notNull()
    .default('active'),
  orderIndex: int('order_index', { mode: 'number' }).default(0),
  createdAt,
  updatedAt,
  completedAt,
});
