const electron = require('electron');
import type { Mission, MissionDraft } from '../shared/types/mission.ts';

const contextBridge: Electron.ContextBridge = electron.contextBridge;
const ipcRenderer: Electron.IpcRenderer = electron.ipcRenderer;

contextBridge.exposeInMainWorld('electronApi', {
  // MISSIONS
  getMissions: () => ipcRenderer.invoke('mission:getAll'),
  createMission: (m: MissionDraft) => ipcRenderer.invoke('mission:create', m),
  updateMission: (m: Mission) => ipcRenderer.invoke('mission:update', m),
  deleteMission: (mid: number) => ipcRenderer.invoke('mission:delete', mid),

  // ACTIVE MISSION
  getActiveMissionId: () => ipcRenderer.invoke('activeMission:getActiveMissionId'),
  setActiveMissionId: (id: number | null) => ipcRenderer.invoke('activeMission:setActiveMissionId', id),
});
