const electron = require('electron');
import type { Mission } from '../shared/types/mission.ts';

const contextBridge: Electron.ContextBridge = electron.contextBridge;
const ipcRenderer: Electron.IpcRenderer = electron.ipcRenderer;

contextBridge.exposeInMainWorld('electronApi', {
  getMissions: () => ipcRenderer.invoke('mission:getAll'),
  updateMission: (m: Mission) => ipcRenderer.invoke('mission:update', m),
});
