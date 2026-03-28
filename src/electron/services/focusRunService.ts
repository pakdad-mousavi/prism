import { eq, isNull } from 'drizzle-orm';
import { focusRun } from '../db/schema/focusRun.sql.js';
import { getDb } from '../db/db.js';
import { UserLocalService } from './userLocalService.js';
import { FocusRunPauseService } from './focusRunPauseService.js';

export class FocusRunService {
  private static heartbeatInterval: NodeJS.Timeout | null = null;
  private static finishCheckInterval: NodeJS.Timeout | null = null;
  private static activeRunId: number | null = null;

  private static runStartedAt: Date;
  private static plannedMs: number;

  static async init() {
    const runs = await getDb().select().from(focusRun).where(isNull(focusRun.endedAt));

    for (const run of runs) {
      if (run.status === 'running') {
        await getDb()
          .update(focusRun)
          .set({
            status: 'abandoned',
            endedAt: run.lastHeartbeatAt ?? new Date(),
          })
          .where(eq(focusRun.id, run.id));
      }
      if (run.status === 'paused') {
        this.activeRunId = run.id;
        this.runStartedAt = run.startedAt;
        this.plannedMs = run.plannedMinutes * 60 * 1000;

        await this.pauseRun(true, run.lastHeartbeatAt);
      }
    }
  }

  static async startRun(missionId: number | null, deviceId: string) {
    // already running
    if (this.activeRunId) {
      return false;
    }

    // User local not set (impossible but handled anyway)
    const userLocal = await UserLocalService.getUserLocalData();
    if (!userLocal) {
      return false;
    }

    this.runStartedAt = new Date();
    this.plannedMs = userLocal.focusRunDuration * 60 * 1000;

    const [run] = await getDb()
      .insert(focusRun)
      .values({
        missionId,
        deviceId,
        offlineCreated: true,
        status: 'running',
        plannedMinutes: userLocal.focusRunDuration,
        startedAt: this.runStartedAt,
        createdAt: this.runStartedAt,
        lastHeartbeatAt: this.runStartedAt,
      })
      .returning();

    this.startHeartbeat(run.id);
    return run;
  }

  private static startHeartbeat(runId: number) {
    this.activeRunId = runId;

    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    if (this.finishCheckInterval) clearInterval(this.finishCheckInterval);

    // Heartbeats
    this.heartbeatInterval = setInterval(() => {
      this.heartbeat();
    }, 15000);

    // Finish checker
    this.finishCheckInterval = setInterval(() => {
      this.checkIfFinished();
    }, 5000);
  }

  private static async heartbeat() {
    if (!this.activeRunId) return;

    await getDb().update(focusRun).set({ lastHeartbeatAt: new Date() }).where(eq(focusRun.id, this.activeRunId));
  }

  private static async checkIfFinished() {
    if (!this.activeRunId) return;

    const totalPauseTimeMs = await FocusRunPauseService.getTotalPausedTimeMs(this.activeRunId);
    const focusedMs = Date.now() - this.runStartedAt.getTime() - totalPauseTimeMs;
    // const plannedMs = run.plannedMinutes * 60 * 1000;

    if (focusedMs >= this.plannedMs) {
      await this.finishRun();
    }
  }

  static async pauseRun(isFromRecovery?: boolean, lastHeartbeatAt?: Date | null) {
    if (!this.activeRunId) return;

    await getDb().update(focusRun).set({ status: 'paused' }).where(eq(focusRun.id, this.activeRunId));
    await FocusRunPauseService.startPause(this.activeRunId, isFromRecovery, lastHeartbeatAt);

    this.stopHeartbeat();
  }

  static async resumeRun() {
    if (!this.activeRunId) return;

    await getDb().update(focusRun).set({ status: 'running' }).where(eq(focusRun.id, this.activeRunId));
    await FocusRunPauseService.endPause(this.activeRunId);

    this.startHeartbeat(this.activeRunId);
  }

  static async finishRun() {
    if (!this.activeRunId) return;

    const [row] = await getDb().select().from(focusRun).where(eq(focusRun.id, this.activeRunId));
    if (!row || row.status === 'completed' || row.status === 'abandoned') return;

    if (row.status === 'paused') {
      await FocusRunPauseService.endPause(this.activeRunId);
    }

    await getDb()
      .update(focusRun)
      .set({
        status: 'completed',
        endedAt: new Date(),
      })
      .where(eq(focusRun.id, this.activeRunId));

    this.stopHeartbeat();
    this.activeRunId = null;
  }

  static async abandonRun() {
    if (!this.activeRunId) return;

    const [row] = await getDb().select().from(focusRun).where(eq(focusRun.id, this.activeRunId));
    if (!row || row.status === 'completed' || row.status === 'abandoned') return;

    if (row.status === 'paused') {
      await FocusRunPauseService.endPause(this.activeRunId);
    }

    await getDb()
      .update(focusRun)
      .set({
        status: 'abandoned',
        endedAt: row.lastHeartbeatAt ?? new Date(),
      })
      .where(eq(focusRun.id, this.activeRunId));

    this.stopHeartbeat();
    this.activeRunId = null;
  }

  private static stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    if (this.finishCheckInterval) {
      clearInterval(this.finishCheckInterval);
      this.finishCheckInterval = null;
    }
  }

  static async getActiveRunState() {
    if (!this.activeRunId) return null;

    const [run] = await getDb().select().from(focusRun).where(eq(focusRun.id, this.activeRunId));
    const pausedMs = await FocusRunPauseService.getTotalPausedTimeMs(this.activeRunId);
    const focusedMs = Date.now() - this.runStartedAt.getTime() - pausedMs;

    return {
      runId: this.activeRunId,
      plannedMs: this.plannedMs,
      status: run.status,
      focusedMs,
      pausedMs,
    };
  }
}
