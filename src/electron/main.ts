import { app, BrowserWindow } from 'electron';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { Utils } from './utils.js';
import { getDb } from './db/db.js';
import { migrate } from 'drizzle-orm/libsql/migrator';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    show: false,
    backgroundColor: '#07080d',
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

app.whenReady().then(async () => {
  // Run any database migrations
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  await migrate(getDb(), {
    migrationsFolder: path.join(__dirname, '../drizzle'),
  });

  // Show UI
  createWindow();
});
