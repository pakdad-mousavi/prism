import { ipcMain } from 'electron';
import { mission } from '../db/schema/mission.sql.js';
import { getDb } from '../db/db.js';
import { validateSender } from './validateSender.js';
import { asc, eq, InferSelectModel } from 'drizzle-orm';

export const registerMissionHandlers = () => {
  ipcMain.handle('mission:getAll', async (e) => {
    validateSender(e.senderFrame);

    return await getDb().select().from(mission).orderBy(asc(mission.priority));
  });

  ipcMain.handle('mission:update', async (e, newMission: InferSelectModel<typeof mission>) => {
    validateSender(e.senderFrame);

    try {
      const { id, ...data } = newMission;
      await getDb().update(mission).set(data).where(eq(mission.id, id));
    } catch {
      return false;
    }
    return true;
  });
};
