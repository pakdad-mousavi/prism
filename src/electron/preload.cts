const electron = require('electron');
import type { Mission, MissionDraft } from '../shared/types/mission.ts';

const contextBridge: Electron.ContextBridge = electron.contextBridge;
const ipcRenderer: Electron.IpcRenderer = electron.ipcRenderer;

contextBridge.exposeInMainWorld('electronApi', {
  // MAIN WINDOW
  showTrafficLights: () => ipcRenderer.send('show-traffic-lights'),

  // MISSIONS
  getMissions: () => ipcRenderer.invoke('mission:getAll'),
  createMission: (m: MissionDraft) => ipcRenderer.invoke('mission:create', m),
  updateMission: (m: Mission) => ipcRenderer.invoke('mission:update', m),
  deleteMission: (mid: number) => ipcRenderer.invoke('mission:delete', mid),

  // ACTIVE MISSION
  getActiveMissionId: () => ipcRenderer.invoke('activeMission:getActiveMissionId'),
  setActiveMissionId: (id: number | null) => ipcRenderer.invoke('activeMission:setActiveMissionId', id),

  // FOCUS RUNS
  startRun: (runId: number | null) => ipcRenderer.invoke('focusRun:startRun', runId),
  pauseRun: () => ipcRenderer.invoke('focusRun:pauseRun'),
  resumeRun: () => ipcRenderer.invoke('focusRun:resumeRun'),
  finishRun: () => ipcRenderer.invoke('focusRun:finishRun'),
  abandonRun: () => ipcRenderer.invoke('focusRun:abandonRun'),
  getActiveRunState: () => ipcRenderer.invoke('focusRun:getActiveRunState'),
  getTotalRunsCompletedToday: () => ipcRenderer.invoke('focusRun:getTotalRunsCompletedToday'),
  getTotalMidRunPausesToday: () => ipcRenderer.invoke('focusRun:getTotalMidRunPausesToday'),
  getTotalSecondsWorkedToday: () => ipcRenderer.invoke('focusRun:getTotalSecondsWorkedToday'),

  // FOCUS STREAK
  fillBarAndStartDecay: () => ipcRenderer.invoke('focusStreak:fillBarAndStartDecay'),
  stopDecay: () => ipcRenderer.invoke('focusStreak:stopDecay'),
  getDecayDetails: () => ipcRenderer.invoke('focusStreak:getDecayDetails'),
});
