import * as React from 'react';

import Head from 'next/head';

const Index = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta content="Application's Home Page" name="description" />
      </Head>

      <main data-testid="home">
        <h1>Home Page</h1>
      </main>
    </>
  );
};

export default Index;
