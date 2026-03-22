import { ipcMain } from 'electron';
import { validateSender } from './validateSender.js';
import { Mission, MissionDraft } from '../../shared/types/mission.js';
import { MissionService } from '../services/missionService.js';

export const registerMissionHandlers = () => {
  ipcMain.handle('mission:getAll', async (e) => {
    validateSender(e.senderFrame);

    return MissionService.getAll();
  });

  ipcMain.handle('mission:create', async (e, missionDraft: MissionDraft) => {
    validateSender(e.senderFrame);

    return MissionService.create(missionDraft);
  });

  ipcMain.handle('mission:update', async (e, newMission: Mission) => {
    validateSender(e.senderFrame);

    return MissionService.update(newMission);
  });

  ipcMain.handle('mission:delete', async (e, mid: number) => {
    validateSender(e.senderFrame);

    return MissionService.delete(mid);
  });
};
