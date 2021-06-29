import * as React from 'react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { appWithTranslation, useTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import theme from 'theme';

function MyApp({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    document.documentElement.setAttribute('dir', i18n.dir());
    document.cookie = `NEXT_LOCALE=${i18n.language}`;
  }, [i18n]);

  return (
    <>
      <Head>
        <title>Application Title</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <ChakraProvider theme={extendTheme({ direction: i18n.dir() }, theme)}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
