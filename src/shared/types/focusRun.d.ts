import type { InferSelectModel } from 'drizzle-orm';
import { focusRun } from '../../electron/db/schema/focusRun.sql';

export type FocusRun = InferSelectModel<typeof focusRun>;

export type ActiveRunState = {
  runId: number;
  plannedMs: number;
  status: 'paused' | 'completed' | 'running' | 'abandoned';
  focusedMs: number;
  pausedMs: number;
};
