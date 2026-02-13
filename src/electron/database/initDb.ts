import Database, { type Database as TDatabase } from 'better-sqlite3';
import { app } from 'electron';
import path from 'node:path';
import { runMigrations } from './migrations.js';

export const createVersionTable = (db: TDatabase) => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_meta (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      version INTEGER NOT NULL
    );
  `);
};

export const initDb = () => {
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'prism.db');

  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  createVersionTable(db);
  runMigrations(db);

  console.log('\nDatabase initialized.');
  return db;
};
