import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql';
import { app } from 'electron';
import path from 'node:path';

let db: LibSQLDatabase;

const userDataPath = app.getPath('userData');
const dbPath = path.join(userDataPath, 'prism.db');
const dbUrl = `file:${dbPath}`;

export const getDb = () => {
  if (!db) {
    db = drizzle(dbUrl);
  }

  return db;
};
