import { createTheme, localStorageColorSchemeManager } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'DidactGothic',
  headings: { fontFamily: 'Creepster' }
});

export const colorSchemeManager = localStorageColorSchemeManager({
  key: 'color-scheme'
});
