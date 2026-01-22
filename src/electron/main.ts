import { app, BrowserWindow } from 'electron';
import path from 'path';
import { Utils } from './utils.js';
import 'dotenv/config';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({ backgroundColor: '#1c1917' });

  if (Utils.isDev()) {
    mainWindow.loadURL(`http://localhost:${process.env.PORT}`);
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), './dist-vue/index.html'));
  }
});
