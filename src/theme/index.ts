import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const customTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode('white', 'gray.800')(props),
      },
    }),
  },
});

export default customTheme;
