import * as React from 'react';

import { Link as ChakraLink, LinkProps as ChakraLinkProps, forwardRef } from '@chakra-ui/react';
import { LinkProps as NextLinkProps } from 'next/dist/client/link';
import NextLink from 'next/link';

import { __DEV__ } from 'utils';

export type LinkProps = React.PropsWithChildren<Omit<ChakraLinkProps & NextLinkProps, 'passHref'>>;

export const Link = forwardRef<LinkProps, 'a'>((props: LinkProps, ref) => {
  const { href, locale, prefetch, replace, scroll, shallow, ...other } = props;
  return (
    <NextLink
      href={href}
      locale={locale}
      passHref
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      <ChakraLink ref={ref} {...other} />
    </NextLink>
  );
});

if (__DEV__) {
  Link.displayName = 'Link';
}
