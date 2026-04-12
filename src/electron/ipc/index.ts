import { registerMissionHandlers } from './mission.handlers.js';
import { registerActiveMissionHandlers } from './activeMission.handlers.js';
import { registerFocusRunHandlers } from './focusRun.handlers.js';
import { registerFocusStreakHandlers } from './focusStreak.handlers.js';

export const registerIpcHandlers = () => {
  registerActiveMissionHandlers();
  registerMissionHandlers();
  registerFocusRunHandlers();
  registerFocusStreakHandlers();
};
