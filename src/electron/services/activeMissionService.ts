import { getDb } from '../db/db.js';
import { activeMission } from '../db/schema/activeMission.sql.js';

export class ActiveMissionService {
  static async init() {
    const [row] = await getDb().select().from(activeMission).limit(1);

    if (!row) {
      await getDb().insert(activeMission).values({ id: 1, missionId: null });
    }
  }

  static async getActiveMissionId() {
    try {
      const [row] = await getDb().select().from(activeMission).limit(1);
      return row ? row.missionId : null;
    } catch {
      return false;
    }
  }

  static async setActiveMissionId(id: number | null) {
    try {
      await getDb().update(activeMission).set({ missionId: id });
      return true;
    } catch {
      return false;
    }
  }
}
