module.exports = {
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-essentials',
    'storybook-addon-styled-component-theme/dist/preset',
    '@storybook/addon-a11y',
  ],
  typescript: {
    check: true, // type-check stories during Storybook build
  },
};
