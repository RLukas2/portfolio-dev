import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod/v4';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    IP_ADDRESS_SALT: z.string().min(1).optional(),
  },
  runtimeEnv: process.env,
  skipValidation: !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
  emptyStringAsUndefined: true,
});

export function getEnv() {
  return env;
}
