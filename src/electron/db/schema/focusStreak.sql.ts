import { int, sqliteTable } from 'drizzle-orm/sqlite-core';

export const focusStreak = sqliteTable('focus_streak', {
  id: int().primaryKey(),
  barsFilled: int('bars_filled').default(0).notNull(),
  decayStartedAt: int('decay_started_at', { mode: 'timestamp_ms' }),
  decayEndsAt: int('decay_ends_at', { mode: 'timestamp_ms' }),
  lastCompletedAt: int('last_completed_at', { mode: 'timestamp_ms' }),
});
