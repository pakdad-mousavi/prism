import { int, sqliteTable } from 'drizzle-orm/sqlite-core';
import { mission } from './mission.sql.js';

export const activeMission = sqliteTable('active_mission', {
  id: int().primaryKey().default(1),
  missionId: int('mission_id', { mode: 'number' }).references(() => mission.id, { onDelete: 'set null' }),
});
