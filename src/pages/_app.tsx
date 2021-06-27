import * as React from 'react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import theme from 'theme';

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <>
      <Head>
        <title>Application Title</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <ChakraProvider theme={extendTheme({ direction }, theme)}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
