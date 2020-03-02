const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.(tsx|mdx)'], // notice mdx support added here
  presets: [
    {
      name: '@storybook/preset-typescript',
      options: {
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../stories'),
        ],
      },
    },
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    'storybook-addon-styled-component-theme/dist/register',
  ],
  // webpackFinal: async config => {
  //   config.module.rules.push({
  //     test: /\.(ts|tsx)$/,
  //     use: [
  //       {
  //         loader: require.resolve('ts-loader'),
  //         options: {
  //           transpileOnly: true,
  //         },
  //       },
  //       {
  //         loader: require.resolve('react-docgen-typescript-loader'),
  //       },
  //     ],
  //   });

  //   config.resolve.extensions.push('.ts', '.tsx');

  //   return config;
  // },
};
