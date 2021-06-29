import * as React from 'react';

import { Container, Heading } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SEO } from 'components';

type HomePageProps = {};

const HomePage = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <SEO description={t('description')} title={t('title')} />
      <Container as="main" data-testid="home" maxW="container.xl">
        <Heading>{t('title')}</Heading>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'home'])),
    },
  };
};

export default HomePage;
