import { __BROWSER__ } from 'utils';

if (__BROWSER__) {
  const { worker } = require('./browser');
  worker.start({ onUnhandledRequest: 'bypass' });
} else {
  const { server } = require('./server');
  server.listen({ onUnhandledRequest: 'bypass' });
}
