const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
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
