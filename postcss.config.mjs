/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'logical-properties-and-values': true,
        'color-mix': false,
        'oklab-function': false,
      },
    },
  },
};

export default config;
