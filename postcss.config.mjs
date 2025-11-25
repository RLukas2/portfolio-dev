/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        'logical-properties-and-values': true,
      },
    },
  },
};

export default config;
