import type { InferSelectModel } from 'drizzle-orm';
import type { mission } from '../../electron/db/schema/mission.sql';

export type Mission = InferSelectModel<typeof mission>;
