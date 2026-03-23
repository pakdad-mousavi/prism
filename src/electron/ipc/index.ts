import { registerMissionHandlers } from './mission.handlers.js';
import { registerActiveMissionHandlers } from './activeMission.handlers.js';

export const registerIpcHandlers = () => {
  registerActiveMissionHandlers();
  registerMissionHandlers();
};
