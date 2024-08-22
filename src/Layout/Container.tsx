import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, CloseButton, Group, Input } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import styles from './Container.module.scss';

import { ThemeButton } from '@/components/ThemeButton/ThemeButton';

export const Container = () => {
  const [value, setValue] = useState('');
  const [debounce] = useDebouncedValue(value, 500);

  console.log(debounce);

  return (
    <AppShell padding='md' header={{ height: { base: 180, xs: 120 } }}>
      <AppShell.Header>
        <Group justify='space-between' h='100%' p='md'>
          <img src='/src/assets/Rick_and_Morty.svg' alt='' height={80} />
          <Input
            className={styles.input}
            placeholder='Введите имя персонажа'
            size='md'
            variant='filled'
            radius='md'
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            rightSectionPointerEvents='all'

            rightSection={(
              <CloseButton
                aria-label='Clear input'
                onClick={() => setValue('')}
                style={{ display: value ? undefined : 'none' }}
              />
            )}
          />
          <ThemeButton />
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
