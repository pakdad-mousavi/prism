import { registerMissionHandlers } from './mission.handlers.js';
import { registerActiveMissionHandlers } from './activeMission.handlers.js';
import { registerFocusRunHandlers } from './focusRun.handlers.js';
import { registerFocusStreakHandlers } from './focusStreak.handlers.js';
import { registerMainWindowHandlers } from './mainWindow.handlers.js';
import { type BrowserWindow } from 'electron';

export const registerIpcHandlers = (mainWindow: BrowserWindow) => {
  registerActiveMissionHandlers();
  registerMissionHandlers();
  registerFocusRunHandlers();
  registerFocusStreakHandlers();
  registerMainWindowHandlers(mainWindow);
};
