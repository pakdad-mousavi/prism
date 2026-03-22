import { and, eq, isNull } from 'drizzle-orm';
import { focusRun } from '../db/schema/focusRun.sql.js';
import { getDb } from '../db/db.js';

export class FocusRunService {
  private static interval: NodeJS.Timeout | null = null;
  private static activeRunId: number | null = null;

  static async init() {
    const [run] = await getDb()
      .select()
      .from(focusRun)
      .where(and(isNull(focusRun.endedAt), eq(focusRun.status, 'running')))
      .limit(1);

    if (run) {
      await this.abandonRun();
    }
  }

  static async startRun(missionId: number, deviceId: string) {
    const [run] = await getDb()
      .insert(focusRun)
      .values({
        missionId,
        startedAt: new Date(),
        deviceId,
        offlineCreated: true,
        status: 'running',
      })
      .returning();

    this.startHeartbeat(run.id);
    return run;
  }

  private static startHeartbeat(runId: number) {
    this.activeRunId = runId;

    if (this.interval) clearInterval(this.interval);

    this.interval = setInterval(() => {
      this.heartbeat();
    }, 15000);
  }

  private static async heartbeat() {
    if (!this.activeRunId) return;

    await getDb().update(focusRun).set({ lastHeartbeatAt: new Date() }).where(eq(focusRun.id, this.activeRunId));
  }

  static async pauseRun() {
    if (!this.activeRunId) return;

    await getDb().update(focusRun).set({ status: 'paused' }).where(eq(focusRun.id, this.activeRunId));

    this.stopHeartbeat();
  }

  static async resumeRun() {
    if (!this.activeRunId) return;
    this.startHeartbeat(this.activeRunId);
  }

  static async finishRun() {
    if (!this.activeRunId) return;

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

    await getDb()
      .update(focusRun)
      .set({
        status: 'abandoned',
        endedAt: new Date(),
      })
      .where(eq(focusRun.id, this.activeRunId));

    this.stopHeartbeat();
    this.activeRunId = null;
  }

  private static stopHeartbeat() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
