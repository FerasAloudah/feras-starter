import { ComponentMeta } from '@storybook/react';

import Home from 'pages';

export default {
  component: Home,
  title: 'Pages/Home',
} as ComponentMeta<typeof Home>;

export const Page = () => <Home />;
