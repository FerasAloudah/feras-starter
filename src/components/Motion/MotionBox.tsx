import { Box, BoxProps } from '@chakra-ui/react';

import { motion, MotionProps } from 'framer-motion';

import { __DEV__ } from 'utils/constants';

export type MotionBoxProps = BoxProps & MotionProps;

export const MotionBox = motion<MotionBoxProps>(Box);

if (__DEV__) {
  MotionBox.displayName = 'MotionBox';
}
