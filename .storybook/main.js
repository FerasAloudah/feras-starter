const path = require('path');

module.exports = {
  stories: [
    '../__stories__/**/*.stories.mdx',
    '../__stories__/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@chakra-ui/storybook-addon', '@storybook/addon-essentials', '@storybook/addon-links'],
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
