import { ipcMain } from 'electron';
import { validateSender } from './validateSender.js';
import { FocusRunService } from '../services/focusRunService.js';
import { UserLocalService } from '../services/userLocalService.js';

export const registerFocusRunHandlers = () => {
  ipcMain.handle('focusRun:startRun', async (e, runId: number) => {
    validateSender(e.senderFrame);

    try {
      const userLocal = await UserLocalService.getUserLocalData();
      if (!userLocal) {
        return false;
      }

      await FocusRunService.startRun(runId, userLocal.deviceId);
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle('focusRun:pauseRun', async (e) => {
    validateSender(e.senderFrame);

    try {
      await FocusRunService.pauseRun();
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle('focusRun:resumeRun', async (e) => {
    validateSender(e.senderFrame);

    try {
      await FocusRunService.resumeRun();
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle('focusRun:finishRun', async (e) => {
    validateSender(e.senderFrame);

    try {
      await FocusRunService.finishRun();
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle('focusRun:abandonRun', async (e) => {
    validateSender(e.senderFrame);

    try {
      await FocusRunService.abandonRun();
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle('focusRun:getActiveRunState', async (e) => {
    validateSender(e.senderFrame);

    try {
      return await FocusRunService.getActiveRunState();
    } catch {
      return false;
    }
  });
};
