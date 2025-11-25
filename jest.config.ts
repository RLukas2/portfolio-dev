import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/public/$1',
    '^.+\\.(svg)$': '<rootDir>/src/__mocks__/svg.tsx',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  transformIgnorePatterns: [
    'node_modules/(?!.*(@t3-oss/env-nextjs|@t3-oss/env-core))',
  ],
};

export default createJestConfig(config);
