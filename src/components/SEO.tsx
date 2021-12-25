import React from 'react';

import { NextSeo, NextSeoProps } from 'next-seo';

import siteConfig from 'configs/site-config';

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
