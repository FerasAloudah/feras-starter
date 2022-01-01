import * as React from 'react';

import * as NextImage from 'next/image';

import theme from '../src/theme';
import './i18n';

export const parameters = {
  chakra: {
    theme,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const decorators = [
  (Story) => (
    <React.Suspense fallback={null}>
      <Story />
    </React.Suspense>
  ),
];
