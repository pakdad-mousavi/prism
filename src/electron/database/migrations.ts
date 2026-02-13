import type { Database as TDatabase } from 'better-sqlite3';
import type { SchemaMeta } from '../../shared/types/schemaMeta.js';

export type Migration = {
  version: number;
  name: string;
  up: (db: TDatabase) => void;
};

const migrations: Migration[] = [
  {
    version: 1,
    name: 'init-schema',

    up: (db: TDatabase) => {
      const tx = db.transaction(() => {
        db.exec(`
        CREATE TABLE IF NOT EXISTS campaign (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          icon TEXT,
          status TEXT DEFAULT 'active',
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS mission (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          scale TEXT NOT NULL CHECK(scale IN ('task','operation')),
          status TEXT NOT NULL CHECK(status IN ('active','paused','completed','archived')),
          campaign_id TEXT REFERENCES campaign(id) ON DELETE SET NULL,
          is_auto_mission INTEGER NOT NULL CHECK(is_auto_mission IN (0,1)),
          estimated_minutes INTEGER,
          target_sessions INTEGER,
          completed_sessions INTEGER DEFAULT 0,
          priority INTEGER,
          created_at INTEGER NOT NULL,
          updated_at INTEGER NOT NULL,
          completed_at INTEGER
        );

        CREATE TABLE IF NOT EXISTS focus_run (
          id TEXT PRIMARY KEY,
          mission_id TEXT REFERENCES mission(id) ON DELETE SET NULL,
          started_at INTEGER NOT NULL,
          ended_at INTEGER,
          planned_minutes INTEGER NOT NULL,
          actual_minutes INTEGER,
          status TEXT NOT NULL CHECK(status IN ('running','paused','completed','abandoned')),
          device_id TEXT NOT NULL,
          offline_created INTEGER DEFAULT 0 CHECK(offline_created IN (0,1)),
          sync_status TEXT DEFAULT 'pending',
          created_at INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS focus_run_pause (
          id TEXT PRIMARY KEY,
          run_id TEXT NOT NULL REFERENCES focus_run(id) ON DELETE CASCADE,
          paused_at INTEGER NOT NULL,
          resumed_at INTEGER,
          created_at INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS streak_day (
          day TEXT PRIMARY KEY,
          focused_minutes INTEGER NOT NULL,
          run_count INTEGER NOT NULL,
          last_run_id TEXT,
          heatmap_level INTEGER DEFAULT 0,
          updated_at INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS sync_queue (
          id TEXT PRIMARY KEY,
          table_name TEXT NOT NULL,
          row_id TEXT NOT NULL,
          operation TEXT NOT NULL,
          payload TEXT NOT NULL,
          created_at INTEGER NOT NULL,
          retry_count INTEGER DEFAULT 0,
          status TEXT DEFAULT 'pending'
        );

        CREATE TABLE IF NOT EXISTS schema_meta (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          version INTEGER NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_streak_updated
          ON streak_day(updated_at);

        CREATE INDEX IF NOT EXISTS idx_mission_campaign
          ON mission(campaign_id);

        CREATE INDEX IF NOT EXISTS idx_focus_run_mission
          ON focus_run(mission_id);

        CREATE INDEX IF NOT EXISTS idx_pause_run
          ON focus_run_pause(run_id);

        CREATE UNIQUE INDEX IF NOT EXISTS idx_schema_meta_single
          ON schema_meta(version);
      `);

        db.prepare(
          `
        INSERT OR IGNORE INTO schema_meta (id, version)
        VALUES (1, 1)
      `,
        ).run();
      });

      tx();
    },
  },
];

export const runMigrations = (db: TDatabase) => {
  // Get the current version
  const row = db
    .prepare<unknown[], SchemaMeta>(
      `
    SELECT version
    FROM schema_meta
    WHERE id = 1
  `,
    )
    .get();

  const currentVersion = row?.version ?? 0;

  for (const m of migrations) {
    if (m.version > currentVersion) {
      console.log(`Running migration v${m.version}: ${m.name}`);

      const tx = db.transaction(() => {
        // Run migration
        m.up(db);

        // Update version
        db.prepare<number>(
          `
          INSERT INTO schema_meta (id, version)
          VALUES (1, ?)
          ON CONFLICT(id)
          DO UPDATE SET version = excluded.version
        `,
        ).run(m.version);
      });

      tx();
    }
  }
};
