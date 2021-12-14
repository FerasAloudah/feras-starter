import { Box, BoxProps } from '@chakra-ui/react';

import { motion, MotionProps } from 'framer-motion';

export type MotionBoxProps = BoxProps & MotionProps;

export const MotionBox = motion<MotionBoxProps>(Box);

export default MotionBox;
