import '@testing-library/jest-dom/extend-expect';
import 'jest-extended';
import { toMatchOneOf, toMatchShapeOf } from 'jest-to-match-shape-of';

import { server } from './src/mocks/server';

expect.extend({
  toMatchOneOf,
  toMatchShapeOf,
});

beforeEach(() => {
  server.listen({ onUnhandledRequest: 'bypass' });
});

afterEach(() => {
  server.close();
});
