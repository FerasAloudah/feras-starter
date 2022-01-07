import { Story } from '@storybook/react';

import { MotionBox, MotionBoxProps } from './MotionBox';

export default {
  component: MotionBox,
  title: 'Components/MotionBox',
};

const Template: Story<MotionBoxProps> = (args) => <MotionBox {...args} />;

export const Default = Template.bind({});

Default.args = {
  bg: 'tomato',
  h: 40,
  w: 40,
};
