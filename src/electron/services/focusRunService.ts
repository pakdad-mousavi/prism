import { and, eq, isNull } from 'drizzle-orm';
import { focusRun } from '../db/schema/focusRun.sql.js';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

export class FocusRunService {
  private interval: NodeJS.Timeout | null = null;
  private activeRunId: number | null = null;

  constructor(private db: LibSQLDatabase) {}

  async init() {
    const [run] = await this.db
      .select()
      .from(focusRun)
      .where(and(isNull(focusRun.endedAt), eq(focusRun.status, 'running')))
      .limit(1);

    if (run) {
      await this.abandonRun();
    }
  }

  async startRun(missionId: number, deviceId: string) {
    const [run] = await this.db
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

  private startHeartbeat(runId: number) {
    this.activeRunId = runId;

    if (this.interval) clearInterval(this.interval);

    this.interval = setInterval(() => {
      this.heartbeat();
    }, 15000);
  }

  private async heartbeat() {
    if (!this.activeRunId) return;

    await this.db.update(focusRun).set({ lastHeartbeatAt: new Date() }).where(eq(focusRun.id, this.activeRunId));
  }

  async pauseRun() {
    if (!this.activeRunId) return;

    await this.db.update(focusRun).set({ status: 'paused' }).where(eq(focusRun.id, this.activeRunId));

    this.stopHeartbeat();
  }

  async resumeRun() {
    if (!this.activeRunId) return;
    this.startHeartbeat(this.activeRunId);
  }

  async finishRun() {
    if (!this.activeRunId) return;

    await this.db
      .update(focusRun)
      .set({
        status: 'completed',
        endedAt: new Date(),
      })
      .where(eq(focusRun.id, this.activeRunId));

    this.stopHeartbeat();
    this.activeRunId = null;
  }

  async abandonRun() {
    if (!this.activeRunId) return;

    await this.db
      .update(focusRun)
      .set({
        status: 'abandoned',
        endedAt: new Date(),
      })
      .where(eq(focusRun.id, this.activeRunId));

    this.stopHeartbeat();
    this.activeRunId = null;
  }

  private stopHeartbeat() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
