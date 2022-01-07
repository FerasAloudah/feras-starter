const { env } = require('./next.config');

module.exports = {
  generateRobotsTxt: true,
  siteUrl: env.SITE_URL || 'https://example.com',
};
