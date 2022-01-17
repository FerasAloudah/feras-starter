import { __BROWSER__ } from 'utils';

import { worker } from './browser';
import { server } from './server';

if (__BROWSER__) {
  worker.start({ onUnhandledRequest: 'bypass' }).then(() => console.log('Mock Service Worker started'));
} else {
  server.listen({ onUnhandledRequest: 'bypass' });
}
