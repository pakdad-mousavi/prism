import { app, BrowserWindow } from 'electron';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { Utils } from './utils.js';
import { getDb } from './db/db.js';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { registerIpcHandlers } from './ipc/index.js';
import { getPreloadPath } from './pathResolver.js';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    show: false,
    backgroundColor: '#07080d',
    webPreferences: {
      preload: getPreloadPath(),
    },
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
  const migrationsFolder = Utils.isDev() ? path.join(__dirname, '../drizzle') : path.join(app.getAppPath(), './drizzle');

  await migrate(getDb(), { migrationsFolder });

  // Register ipc handlers
  registerIpcHandlers();

  // Show UI
  createWindow();
});
