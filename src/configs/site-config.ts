export const applicationName = process.env.APPLICATION_NAME;
export const applicationDescription = process.env.APPLICATION_DESCRIPTION;
export const baseUrl = process.env.SITE_URL;

export const siteConfig = {
  seo: {
    description: applicationDescription,
    languageAlternates: [
      {
        href: `${baseUrl}/en`,
        hrefLang: 'en',
      },
      {
        href: `${baseUrl}`,
        hrefLang: 'ar',
      },
    ],
    openGraph: {
      description: applicationDescription,
      site_name: `${applicationName}: ${applicationDescription}`,
      title: applicationName,
      type: 'website',
      url: baseUrl,
    },
    siteUrl: baseUrl,
    title: applicationName,
    titleTemplate: `%s - ${applicationName}`,
  },
};

export default siteConfig;
