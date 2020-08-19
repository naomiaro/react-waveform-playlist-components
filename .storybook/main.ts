const path = require('path');
const SRC_PATH = path.join(__dirname, '../src');
const STORIES_PATH = path.join(__dirname, '../stories');

module.exports = {
  stories: ['../stories/**/*.stories.(tsx|mdx)'], // notice mdx support added here
  presets: [
    {
      name: '@storybook/preset-typescript',
      options: {
        include: [SRC_PATH, STORIES_PATH, __dirname],
        transpileManager: true,
      },
    },
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-contexts/register',
    '@storybook/addon-knobs/register',
    'storybook-addon-styled-component-theme/dist/register',
    '@storybook/addon-a11y',
  ],
};
