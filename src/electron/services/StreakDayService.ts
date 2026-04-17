import { and, asc, gte, lt, sql } from 'drizzle-orm';
import { getDb } from '../db/db.js';
import { streakDay } from '../db/schema/streakDay.sql.js';

export class StreakDayService {
  private static toDayNumber(timestamp: number) {
    return Math.floor(timestamp / (1000 * 60 * 60 * 24));
  }

  static async getStreakDaysInDateRange(range: { from: Date; to: Date }) {
    const streakDays = await getDb()
      .select()
      .from(streakDay)
      .where(and(gte(streakDay.day, range.from), lt(streakDay.day, range.to)))
      .orderBy(asc(streakDay.day));

    return streakDays;
  }

  static async upsertStreakDay(streakDayDeltas: { day: Date; focusedMinutesDelta: number; lastRunId: number | null }) {
    await getDb()
      .insert(streakDay)
      .values({
        day: streakDayDeltas.day,
        focusedMinutes: streakDayDeltas.focusedMinutesDelta,
        runCount: 1,
        lastRunId: streakDayDeltas.lastRunId,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: streakDay.day,
        set: {
          focusedMinutes: sql`${streakDay.focusedMinutes} + ${streakDayDeltas.focusedMinutesDelta}`,
          runCount: sql`${streakDay.runCount} + 1`,
          lastRunId: streakDayDeltas.lastRunId,
          updatedAt: new Date(),
        },
      });
  }

  static async getLongestStreakCountInDateRange(range: { from: Date; to: Date }) {
    // Get all days in range
    const rows = await getDb()
      .select({ day: streakDay.day })
      .from(streakDay)
      .where(and(gte(streakDay.day, range.from), lt(streakDay.day, range.to)))
      .orderBy(asc(streakDay.day));

    if (rows.length === 0) return 0;

    let longest = 1;
    let current = 1;

    // Find longest consecutive streak
    for (let i = 1; i < rows.length; i++) {
      // Compare time between previous and current day
      const prev = this.toDayNumber(rows[i - 1].day.getTime());
      const curr = this.toDayNumber(rows[i].day.getTime());
      const diffDays = curr - prev;

      // If one day, add to current streak, else reset
      if (diffDays === 1) {
        current++;
        longest = Math.max(longest, current);
      } else {
        current = 1;
      }
    }

    return longest;
  }

  static async getCurrentStreakCount() {
    // Get all days in range
    const rows = await getDb().select({ day: streakDay.day }).from(streakDay).orderBy(asc(streakDay.day));

    if (rows.length === 0) return 0;

    // If the last activity wasn't today or yesterday, then the streak is broken
    const today = this.toDayNumber(Date.now());
    const lastDay = this.toDayNumber(rows[rows.length - 1].day.getTime());
    if (today - lastDay > 1) return 0;

    let current = 1;

    // Find longest consecutive streak
    for (let i = rows.length - 1; i > 0; i++) {
      // Compare time between previous and current day
      const curr = this.toDayNumber(rows[i].day.getTime());
      const prev = this.toDayNumber(rows[i - 1].day.getTime());
      const diffDays = curr - prev;

      // If one day, add to current streak, else reset
      if (diffDays === 1) {
        current++;
      } else {
        break;
      }
    }

    return current;
  }
}
