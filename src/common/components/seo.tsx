import { NextSeo, NextSeoProps } from 'next-seo';

import { siteConfig } from 'config';
import { __DEV__ } from 'utils';

export type SEOProps = NextSeoProps;

export const SEO = (props: SEOProps) => {
  const { description, title, ...other } = props;
  return (
    <NextSeo
      {...other}
      description={description}
      openGraph={{ ...other.openGraph, description, title }}
      title={title}
      titleTemplate={siteConfig.seo.titleTemplate}
    />
  );
};

if (__DEV__) {
  SEO.displayName = 'SEO';
}
