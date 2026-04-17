import { and, eq, gte, isNull, lt, count, sql } from 'drizzle-orm';
import { focusRun } from '../db/schema/focusRun.sql.js';
import { getDb } from '../db/db.js';
import { UserLocalService } from './userLocalService.js';
import { FocusRunPauseService } from './focusRunPauseService.js';
import { FocusStreakService } from './focusStreakService.js';
import { MissionService } from './missionService.js';
import { StreakDayService } from './StreakDayService.js';

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

  private static async upsertStreakDay(upsertData: { lastRunId: number | null; focusedMinutesDelta: number }) {
    const now = new Date();
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const streakDayDeltas = {
      day,
      focusedMinutesDelta: upsertData.focusedMinutesDelta,
      lastRunId: upsertData.lastRunId,
    };
    await StreakDayService.upsertStreakDay(streakDayDeltas);
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

    // Stop any decay if needed
    await FocusStreakService.stopDecay();

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

    if (focusedMs >= this.plannedMs) {
      await FocusStreakService.fillBarAndStartDecay();
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

    // Defensive guards
    const [row] = await getDb().select().from(focusRun).where(eq(focusRun.id, this.activeRunId));
    if (!row || row.status === 'completed' || row.status === 'abandoned') return;

    // End pause if needed
    if (row.status === 'paused') {
      await FocusRunPauseService.endPause(this.activeRunId);
    }

    // Update focus run
    const endedAt = new Date();

    await getDb()
      .update(focusRun)
      .set({
        status: 'completed',
        endedAt,
      })
      .where(eq(focusRun.id, this.activeRunId));

    // Stop heartbeat and reset active run id
    this.stopHeartbeat();
    this.activeRunId = null;

    // Start focus streak decay
    await FocusStreakService.startDecay();

    // Update streakDays
    const startedAt = row.startedAt.getTime();
    const focusedMs = Math.max(0, endedAt.getTime() - startedAt);
    const focusedMinutes = Math.round(focusedMs / 1000 / 60);
    await this.upsertStreakDay({ lastRunId: row.id, focusedMinutesDelta: focusedMinutes });

    // Update mission if needed
    if (row.missionId) {
      const mission = await MissionService.get(row.missionId);
      if (!mission) return;
      const missionRow = mission[0];
      missionRow.completedSessions += 1;

      await MissionService.update(missionRow);
    }
  }

  static async abandonRun() {
    if (!this.activeRunId) return;

    await FocusStreakService.startDecay();

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

  // INFO GETTERS
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

  static async getTotalRunsCompletedToday() {
    const now = new Date();

    // start of today
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // start of tomorrow
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const res = (
      await getDb()
        .select({
          totalRuns: count(focusRun.id).mapWith(Number),
        })
        .from(focusRun)
        .where(and(eq(focusRun.status, 'completed'), gte(focusRun.endedAt, startOfDay), lt(focusRun.endedAt, endOfDay)))
    )[0];

    return res.totalRuns ?? 0;
  }

  static async getTotalMidRunPausesToday() {
    return await FocusRunPauseService.getTotalMidRunPausesToday();
  }

  static async getTotalSecondsWorkedToday() {
    const now = new Date();

    // start of today
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // start of tomorrow
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const res = (
      await getDb()
        .select({
          totalSeconds: sql<number>`
        COALESCE(
          SUM(
            (${focusRun.endedAt} - ${focusRun.startedAt}) / 1000
          ),
          0
        )
      `.mapWith(Number),
        })
        .from(focusRun)
        .where(and(eq(focusRun.status, 'completed'), gte(focusRun.endedAt, startOfDay), lt(focusRun.endedAt, endOfDay)))
    )[0];

    return res.totalSeconds ?? 0;
  }
}
