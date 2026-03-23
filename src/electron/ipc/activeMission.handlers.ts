import { ipcMain } from 'electron';
import { validateSender } from './validateSender.js';
import { ActiveMissionService } from '../services/activeMissionService.js';

export const registerActiveMissionHandlers = () => {
  ipcMain.handle('activeMission:getActiveMissionId', async (e) => {
    validateSender(e.senderFrame);

    return await ActiveMissionService.getActiveMissionId();
  });

  ipcMain.handle('activeMission:setActiveMissionId', async (e, id: number | null) => {
    validateSender(e.senderFrame);

    return await ActiveMissionService.setActiveMissionId(id);
  });
};
