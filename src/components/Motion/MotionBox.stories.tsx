import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MotionBox } from './MotionBox';

export default {
  component: MotionBox,
  title: 'Components/MotionBox',
} as ComponentMeta<typeof MotionBox>;

const Template: ComponentStory<typeof MotionBox> = (args) => <MotionBox {...args} />;

export const Default = Template.bind({});

Default.args = {
  bg: 'tomato',
  h: '40',
  w: '40',
};
