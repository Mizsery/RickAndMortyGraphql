import { createTheme, localStorageColorSchemeManager } from '@mantine/core';

export const theme = createTheme({

});

export const colorSchemeManager = localStorageColorSchemeManager({
  key: 'color-scheme'
});
