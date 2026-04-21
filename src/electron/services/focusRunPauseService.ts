import { and, count, eq, gte, isNull, lt } from 'drizzle-orm';
import { getDb } from '../db/db.js';
import { focusRunPause } from '../db/schema/focusRunPause.sql.js';

export class FocusRunPauseService {
  static async getTotalPausedTimeMs(runId: number) {
    let total = 0;
    const pauses = await getDb().select().from(focusRunPause).where(eq(focusRunPause.runId, runId));

    for (const pause of pauses) {
      const pausedAt = pause.pausedAt;
      const resumedAt = pause.resumedAt ? pause.resumedAt : new Date();

      const pauseDuration = resumedAt.getTime() - pausedAt.getTime();
      total += pauseDuration;
    }

    return total;
  }

  static async startPause(runId: number, isFromRecovery?: boolean, lastHeartbeatAt?: Date | null) {
    try {
      const [existingPause] = await getDb()
        .select()
        .from(focusRunPause)
        .where(and(eq(focusRunPause.runId, runId), isNull(focusRunPause.resumedAt)))
        .limit(1);

      if (existingPause) return true;

      if (isFromRecovery && lastHeartbeatAt) {
        await getDb().insert(focusRunPause).values({ runId, pausedAt: lastHeartbeatAt });
      } else {
        await getDb().insert(focusRunPause).values({ runId, pausedAt: new Date() });
      }
      return true;
    } catch {
      return false;
    }
  }

  static async endPause(runId: number) {
    try {
      await getDb()
        .update(focusRunPause)
        .set({
          resumedAt: new Date(),
        })
        .where(and(eq(focusRunPause.runId, runId), isNull(focusRunPause.resumedAt)));

      return true;
    } catch {
      return false;
    }
  }

  static async getTotalMidRunPausesToday() {
    const now = new Date();

    // start of today
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // start of tomorrow
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const res = (
      await getDb()
        .select({
          totalPauses: count(focusRunPause.id).mapWith(Number),
        })
        .from(focusRunPause)
        .where(and(gte(focusRunPause.pausedAt, startOfDay), lt(focusRunPause.pausedAt, endOfDay)))
    )[0];

    return res?.totalPauses ?? 0;
  }
}
