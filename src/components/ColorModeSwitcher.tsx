import * as React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

import { IconButton, IconButtonProps, useColorMode, useColorModeValue } from '@chakra-ui/react';

type ColorModeSwitcherProps = Omit<IconButtonProps, 'aria-label'>;

const ColorModeSwitcher: React.FC<Partial<ColorModeSwitcherProps>> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      aria-label={`Switch to ${text} mode`}
      color="current"
      fontSize="lg"
      icon={<SwitchIcon />}
      marginLeft="2"
      onClick={toggleColorMode}
      size="md"
      variant="ghost"
      {...props}
    />
  );
};

export default ColorModeSwitcher;
