import '@testing-library/jest-dom/extend-expect';
import 'jest-extended';
import { toMatchOneOf, toMatchShapeOf } from 'jest-to-match-shape-of';

expect.extend({
  toMatchOneOf,
  toMatchShapeOf,
});
