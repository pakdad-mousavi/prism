import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createdAt, updatedAt } from './columns.helpers.js';

export const userLocal = sqliteTable('user_local', {
  id: int().primaryKey({ autoIncrement: true }),
  username: text(),
  email: text(),
  cloudId: text('cloud_id'),
  lastSyncedAt: int('last_synced_at', { mode: 'timestamp_ms' }),
  deviceId: text('device_id').notNull(),
  theme: text({ enum: ['prismRed'] })
    .notNull()
    .default('prismRed'),
  createdAt,
  updatedAt,
});
