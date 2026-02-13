import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'node:path';
import { runMigrations } from './migrations.js';

export const initDb = () => {
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'prism.db');

  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  runMigrations(db);

  return db;
};
