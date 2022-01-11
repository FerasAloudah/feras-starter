import { ReactElement, ReactNode, useEffect } from 'react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { NextPage } from 'next';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { getLangDir } from 'rtl-detect';

import { siteConfig } from 'config';
import theme from 'theme';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (props: AppPropsWithLayout) => {
  const { Component, pageProps } = props;
  const router = useRouter();
  const locale = router.locale as string;
  const direction = getLangDir(locale);
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
    document.cookie = `NEXT_LOCALE=${locale}`;
  }, [direction, locale]);

  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <DefaultSeo {...siteConfig.seo} openGraph={{ ...siteConfig.seo, locale }} />
      <ChakraProvider theme={extendTheme({ direction }, theme)}>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </>
  );
};

export default appWithTranslation(MyApp);
