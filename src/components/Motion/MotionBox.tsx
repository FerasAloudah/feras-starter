import { chakra, PropsOf } from '@chakra-ui/react';

import { CustomDomComponent, motion } from 'framer-motion';

import { __DEV__ } from 'utils';

export const MotionBox: CustomDomComponent<PropsOf<typeof chakra.div>> = motion(chakra.div);

export type MotionBoxProps = PropsOf<typeof MotionBox>;

if (__DEV__) {
  MotionBox.displayName = 'MotionBox';
}
