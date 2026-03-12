import { ipcMain } from 'electron';
import { mission } from '../db/schema/mission.sql.js';
import { getDb } from '../db/db.js';
import { validateSender } from './validateSender.js';
import { desc, eq, InferSelectModel } from 'drizzle-orm';
import { MissionDraft } from '../../shared/types/mission.js';

export const registerMissionHandlers = () => {
  ipcMain.handle('mission:getAll', async (e) => {
    validateSender(e.senderFrame);

    return await getDb().select().from(mission).orderBy(desc(mission.priority));
  });

  ipcMain.handle('mission:create', async (e, missionDraft: MissionDraft) => {
    validateSender(e.senderFrame);

    try {
      // Destructure data
      const data = { updatedAt: new Date(), createdAt: new Date(), ...missionDraft };

      await getDb().insert(mission).values(data);
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle('mission:update', async (e, newMission: InferSelectModel<typeof mission>) => {
    validateSender(e.senderFrame);

    try {
      // Only update the editable data
      const { id, createdAt, ...data } = newMission;

      // Update the date
      data.updatedAt = new Date();

      await getDb().update(mission).set(data).where(eq(mission.id, id));
    } catch {
      return false;
    }
    return true;
  });

  ipcMain.handle('mission:delete', async (e, mid: number) => {
    validateSender(e.senderFrame);

    try {
      await getDb().delete(mission).where(eq(mission.id, mid));
    } catch {
      return false;
    }
    return true;
  });
};
