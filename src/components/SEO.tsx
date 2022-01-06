import React from 'react';

import { NextSeo, NextSeoProps } from 'next-seo';

import { siteConfig } from 'config';
import { __DEV__ } from 'utils';

export const SEO = (props: NextSeoProps) => {
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
