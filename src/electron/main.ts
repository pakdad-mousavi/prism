import { app, BrowserWindow } from 'electron';
import path from 'path';
import 'dotenv/config';
import { Utils } from './utils.js';
import { initDb } from './database/initDb.js';

let db;

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
  });
};

app.whenReady().then(() => {
  // Initialize database
  db = initDb();

  // Show UI
  createWindow();
});
