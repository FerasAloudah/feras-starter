const { i18n } = require('./next-i18next.config');

module.exports = {
  env: {
    // Never store secrets here, use .env instead.
    APPLICATION_DESCRIPTION: 'Description',
    APPLICATION_NAME: 'Application',
    APPLICATION_VERSION: '1.0.0',
    SITE_URL: 'https://example.com',
  },
  i18n,
  reactStrictMode: true,
};
