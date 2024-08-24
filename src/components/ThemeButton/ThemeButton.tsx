import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import clsx from 'clsx';

import classes from './ThemeButton.module.scss';

export const ThemeButton = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      visibleFrom='sm'
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant='default'
      size='xl'
      aria-label='Toggle color scheme'
    >
      <IconSun className={clsx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={clsx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
};
