import path from 'node:path';
import { fileURLToPath } from 'node:url';

import nextConfig from 'eslint-config-next/core-web-vitals';

import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);

const config = [
  // GLOBAL IGNORES
  // In flat config, an object with ONLY 'ignores' acts as a global ignore.
  {
    ignores: [
      'node_modules/*',
      '.next/*',
      '.idea/*',
      'out/*',
      'coverage',
      'build',
      '.env.*',
      'public',
      'dist',
      '**/.prettierrc.js',
      '**/next-env.d.ts',
      '.content-collections/generated/**',
    ],
  },

  // NEXT.JS CORE RULES
  // We spread the Next.js config first so your custom rules can override them.
  // Note: If you are strictly on Next.js 15, `nextConfig` is likely an array you spread.
  // If `eslint-config-next` exports a single object, remove the spread `...` if it fails.
  // Current Next.js 15 docs usage:
  ...nextConfig,

  // TYPESCRIPT & CUSTOM RULES
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      // --- Custom Override ---
      'import/no-anonymous-default-export': 'off',
      'react/no-unescaped-entities': 'off',

      // TypeScript Rules
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',

      // Import Sorting & Unused Imports
      'import/prefer-default-export': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
];

export default config;
