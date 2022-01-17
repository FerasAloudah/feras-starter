import { PropsWithChildren } from 'react';

import { useHasMounted } from 'common';
import { __DEV__ } from 'utils';

/**
 * Please read: https://www.joshwcomeau.com/react/the-perils-of-rehydration
 */
export const ClientOnly = ({ children }: PropsWithChildren<{}>) => {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

if (__DEV__) {
  ClientOnly.displayName = 'ClientOnly';
}
