import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import { env } from '../env';

// biome-ignore lint/performance/noNamespaceImport: we want to import all of the schema for the client
import * as schema from './schema';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: env.DATABASE_URL });

export const db = drizzle({
  client: pool,
  schema,
  casing: 'snake_case',
});
