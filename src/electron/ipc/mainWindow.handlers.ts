import { type BrowserWindow, ipcMain } from 'electron';
import { validateSender } from './validateSender.js';

export const registerMainWindowHandlers = (mainWindow: BrowserWindow) => {
  ipcMain.on('show-traffic-lights', (e) => {
    validateSender(e.senderFrame);

    mainWindow.setWindowButtonVisibility(true);
  });
};
