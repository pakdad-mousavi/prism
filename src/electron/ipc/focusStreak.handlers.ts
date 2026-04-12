import { ipcMain } from 'electron';
import { validateSender } from './validateSender.js';
import { FocusStreakService } from '../services/focusStreakService.js';

export const registerFocusStreakHandlers = () => {
  ipcMain.handle('focusStreak:fillBarAndStartDecay', async (e) => {
    validateSender(e.senderFrame);

    try {
      await FocusStreakService.fillBarAndStartDecay();
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle('focusStreak:stopDecay', async (e) => {
    validateSender(e.senderFrame);

    try {
      await FocusStreakService.stopDecay();
      return true;
    } catch {
      return false;
    }
  });

  ipcMain.handle('focusStreak:getDecayDetails', async (e) => {
    validateSender(e.senderFrame);

    try {
      return await FocusStreakService.getDecayDetails();
    } catch {
      return false;
    }
  });
};
