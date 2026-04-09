import { eq } from 'drizzle-orm';
import { getDb } from '../db/db.js';
import { focusStreak } from '../db/schema/focusStreak.sql.js';

export class FocusStreakService {
  private static ROW_ID = 1;
  private static TOTAL_BARS = 6;
  private static DECAY_DURATION_MS = 10 * 60 * 1000;
  private static decayTimeout: NodeJS.Timeout | null = null;

  static async init() {
    // Set up initial row if needed
    const results = await getDb().select().from(focusStreak).limit(1);
    if (results.length <= 0) {
      return await getDb().insert(focusStreak).values({ id: this.ROW_ID });
    }

    // handle ongoing decays after app relauch
    const streak = results[0];
    if (!streak.decayStartedAt || !streak.decayEndsAt) return;

    const endsAtMs = streak.decayEndsAt.getTime();
    const now = Date.now();

    if (now >= endsAtMs) {
      await this.completeDecay(true);
    } else {
      const remainingMs = endsAtMs - now;
      this.startDecayTimer(remainingMs);
    }
  }

  static async fillBarAndStartDecay() {
    const streak = (await getDb().select().from(focusStreak).limit(1))[0];
    const newBarsFilled = streak.barsFilled >= this.TOTAL_BARS ? this.TOTAL_BARS : streak.barsFilled + 1;

    await getDb()
      .update(focusStreak)
      .set({
        barsFilled: newBarsFilled,
        decayStartedAt: new Date(),
        decayEndsAt: new Date(Date.now() + this.DECAY_DURATION_MS),
      });

    this.startDecayTimer();
  }

  private static startDecayTimer(duration?: number) {
    if (this.decayTimeout) return;

    this.decayTimeout = setTimeout(async () => {
      await this.completeDecay();
    }, duration || this.DECAY_DURATION_MS);
  }

  private static async completeDecay(noSecondChance?: boolean) {
    const streak = (await getDb().select().from(focusStreak).limit(1))[0];

    // Update database
    if (streak.barsFilled <= 1 || noSecondChance) {
      await getDb()
        .update(focusStreak)
        .set({
          barsFilled: 0,
          decayStartedAt: null,
          decayEndsAt: null,
        })
        .where(eq(focusStreak.id, this.ROW_ID));
    } else {
      return await getDb()
        .update(focusStreak)
        .set({
          barsFilled: 1,
          decayStartedAt: new Date(),
          decayEndsAt: new Date(Date.now() + this.DECAY_DURATION_MS),
        })
        .where(eq(focusStreak.id, this.ROW_ID));
    }

    // clear decay timeout
    if (this.decayTimeout) {
      clearTimeout(this.decayTimeout);
      this.decayTimeout = null;
    }
  }

  static async stopDecay() {
    await getDb().update(focusStreak).set({
      decayStartedAt: null,
      decayEndsAt: null,
    });

    // clear decay timeout
    if (this.decayTimeout) {
      clearTimeout(this.decayTimeout);
      this.decayTimeout = null;
    }
  }

  static async getDecayDetails() {
    const streak = (await getDb().select().from(focusStreak).limit(1))[0];

    if (!streak.decayEndsAt || !streak.decayStartedAt) return null;

    return {
      barsFilled: streak.barsFilled,
      decayTimeLeftMs: streak.decayEndsAt.getTime() - streak.decayStartedAt.getTime(),
    };
  }
}
