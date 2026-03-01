import { ipcMain } from 'electron';
import { mission } from '../db/schema/mission.sql.js';
import { getDb } from '../db/db.js';
import { validateSender } from './validateSender.js';
import { asc, desc } from 'drizzle-orm';

export const registerMissionHandlers = () => {
  ipcMain.handle('mission:getAll', async (e) => {
    validateSender(e.senderFrame);

    return await getDb().select().from(mission).orderBy(asc(mission.orderIndex), desc(mission.priority));
  });
};
