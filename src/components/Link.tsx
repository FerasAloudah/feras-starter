import * as React from 'react';
import { PropsWithChildren } from 'react';

import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { LinkProps as NextLinkProps } from 'next/dist/client/link';
import NextLink from 'next/link';

export type LinkProps = PropsWithChildren<Omit<ChakraLinkProps & NextLinkProps, 'as'>>;

export const Link: React.FC<LinkProps> = (props) => {
  return <ChakraLink as={NextLink} {...props} />;
};
