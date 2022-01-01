import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: 'en',
    debug: true,
  });
