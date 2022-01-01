const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@chakra-ui/storybook-addon',
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve.fallback.fs = false;
    config.resolve.modules.push(path.resolve(__dirname, '..', 'src'));
    return config;
  },
  typescript: {
    reactDocgen: 'none',
  },
};
