import { mission } from '../db/schema/mission.sql.js';
import { desc, eq } from 'drizzle-orm';
import { Mission, MissionDraft } from '../../shared/types/mission.js';
import { getDb } from '../db/db.js';

export class MissionService {
  static async get(id: number) {
    try {
      return await getDb().select().from(mission).where(eq(mission.id, id));
    } catch {
      return false;
    }
  }

  static async getAll() {
    try {
      return await getDb().select().from(mission).orderBy(desc(mission.priority));
    } catch {
      return false;
    }
  }

  static async create(missionDraft: MissionDraft) {
    try {
      // Destructure data
      const data = { updatedAt: new Date(), createdAt: new Date(), ...missionDraft };

      await getDb().insert(mission).values(data);
      return true;
    } catch {
      return false;
    }
  }

  static async update(newMission: Mission) {
    try {
      // Only update the editable data
      let completedAt: Date | undefined = newMission.completedAt;
      const { id, createdAt, ...data } = newMission;
      if (newMission.status === 'completed') {
        completedAt = new Date();
      } else {
        completedAt = undefined;
      }

      // Update the date
      data.updatedAt = new Date();

      await getDb()
        .update(mission)
        .set({ ...data, completedAt })
        .where(eq(mission.id, id));
      return true;
    } catch {
      return false;
    }
  }

  static async delete(missionId: number) {
    try {
      await getDb().delete(mission).where(eq(mission.id, missionId));
      return true;
    } catch {
      return false;
    }
  }
}
