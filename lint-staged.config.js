// lint-staged.config.js
module.exports = {
  // Format with Prettier first, then let ESLint fix issues
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],

  // Run typecheck for staged TS/TSX files (this is a command returning a string)
  '**/*.ts?(x)': () => 'pnpm run typecheck',

  // Format json files
  '*.json': ['prettier --write'],

  // Optional: format docs/configs/styles you might want to keep consistent
  '*.{md,mdx,css,scss,html,yml,yaml}': ['prettier --write'],
};
