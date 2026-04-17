import type { InferSelectModel } from 'drizzle-orm';
import type { streakDay } from '../../electron/db/schema/streakDay.sql.js';

export type StreakDay = InferSelectModel<typeof streakDay>;
