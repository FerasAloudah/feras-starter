import { chakra } from '@chakra-ui/react';
import NextImage from 'next/image';

import { __DEV__ } from 'utils';

export const Image = chakra(NextImage, {
  shouldForwardProp: (prop) => {
    return [
      'width',
      'height',
      'src',
      'alt',
      'quality',
      'placeholder',
      'blurDataURL',
      'loader',
      'layout',
      'priority',
      'loading',
      'lazyBoundary',
      'unoptimized',
      'onLoadingComplete',
    ].includes(prop);
  },
});

if (__DEV__) {
  Image.displayName = 'Image';
}
