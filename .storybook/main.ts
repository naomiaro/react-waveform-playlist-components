const path = require('path');
const SRC_PATH = path.join(__dirname, '../src');
const STORIES_PATH = path.join(__dirname, '../stories');

module.exports = {
  stories: ['../stories/**/*.stories.@(tsx|mdx)'], // notice mdx support added here
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    'storybook-addon-styled-component-theme/dist/preset',
    '@storybook/addon-a11y',
  ],
};
