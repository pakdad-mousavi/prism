import type { InferSelectModel } from 'drizzle-orm';
import { mission } from '../../electron/db/schema/mission.sql';

export type Mission = InferSelectModel<typeof mission>;

export type MissionDraft = {
  title: string;
  isAutoMission: boolean;
  priority: number;
  scale: 'task' | 'operation';
  estimatedMinutes: number | null;
  targetSessions: number | null;
  status: 'active' | 'on hold' | 'completed' | 'archived';
};
