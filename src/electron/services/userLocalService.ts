import { randomUUID } from 'node:crypto';
import { getDb } from '../db/db.js';
import { userLocal } from '../db/schema/userLocal.sql.js';

export class UserLocalService {
  static async init() {
    const [row] = await getDb().select().from(userLocal).limit(1);
    if (!row) {
      const deviceId = randomUUID();
      const createdAt = new Date();
      const updatedAt = new Date();
      await getDb().insert(userLocal).values({ deviceId, createdAt, updatedAt });
    }
  }
}
