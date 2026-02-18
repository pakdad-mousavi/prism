import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createdAt, updatedAt } from './columns.helpers.js';

export const campaign = sqliteTable('campaign', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  icon: text(),
  status: text({ enum: ['active', 'paused', 'completed', 'archived'] }).default('active'),
  createdAt,
  updatedAt,
});
