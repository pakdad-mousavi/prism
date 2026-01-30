import { app, BrowserWindow } from 'electron';
import path from 'path';
import { Utils } from './utils.js';
import 'dotenv/config';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    show: false,
    backgroundColor: '#1c1917',
  });

  if (Utils.isDev()) {
    mainWindow.loadURL(`http://localhost:${process.env.PORT}`);
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), './dist-vue/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });
};

app.whenReady().then(createWindow);
