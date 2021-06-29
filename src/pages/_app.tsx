import * as React from 'react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { siteConfig } from 'configs/site-config';
import theme from 'theme';

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;
  const { i18n } = useTranslation();

  React.useEffect(() => {
    document.documentElement.setAttribute('dir', i18n.dir());
    document.cookie = `NEXT_LOCALE=${i18n.language}`;
  }, [i18n]);

  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <DefaultSeo {...siteConfig.seo} openGraph={{ ...siteConfig.seo, locale: i18n.language }} />
      <ChakraProvider theme={extendTheme({ direction: i18n.dir() }, theme)}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default appWithTranslation(MyApp);
