const electron = require('electron');
const contextBridge: Electron.ContextBridge = electron.contextBridge;
const ipcRenderer: Electron.IpcRenderer = electron.ipcRenderer;

contextBridge.exposeInMainWorld('electronApi', {
  getMissions: () => ipcRenderer.invoke('mission:getAll'),
});
