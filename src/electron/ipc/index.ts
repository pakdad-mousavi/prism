import { registerMissionHandlers } from './mission.handlers.js';
import { registerActiveMissionHandlers } from './activeMission.handlers.js';
import { registerFocusRunHandlers } from './focusRun.handlers.js';

export const registerIpcHandlers = () => {
  registerActiveMissionHandlers();
  registerMissionHandlers();
  registerFocusRunHandlers();
};
