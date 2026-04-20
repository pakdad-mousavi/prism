import { ipcMain } from 'electron';
import { validateSender } from './validateSender.js';
import { StreakDayService } from '../services/StreakDayService.js';

export const registerStreakDayHandlers = () => {
  ipcMain.handle('streakDay:getCurrentStreakCount', async (e) => {
    validateSender(e.senderFrame);

    return await StreakDayService.getCurrentStreakCount();
  });

  ipcMain.handle('streakDay:getLongestStreakCountInDateRange', async (e, from: Date, to: Date) => {
    validateSender(e.senderFrame);

    return await StreakDayService.getLongestStreakCountInDateRange({ from, to });
  });

  ipcMain.handle('streakDay:getStreakDaysInDateRange', async (e, from: Date, to: Date) => {
    validateSender(e.senderFrame);

    return await StreakDayService.getStreakDaysInDateRange({ from, to });
  });

  ipcMain.handle('streakDay:getTotalFocusRunsInDateRange', async (e, from: Date, to: Date) => {
    validateSender(e.senderFrame);

    return await StreakDayService.getTotalFocusRunsInDateRange({ from, to });
  });
};
