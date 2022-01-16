import { ReactElement } from 'react';

import { Container, Heading } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SEO } from 'common';
import { DefaultLayout } from 'layouts';

type HomePageProps = {};

const HomePage = () => {
  const { t } = useTranslation(['common', 'home']);

  return (
    <>
      <SEO description={t('home:description')} title={t('home:title')} />
      <Container as="main" data-testid="home-container" maxW="container.xl">
        <Heading>{t('home:title')}</Heading>
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

HomePage.getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;

export default HomePage;
