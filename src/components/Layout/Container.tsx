import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppShell, Burger, CloseButton, Group, Input, Title } from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';

import styles from './Container.module.scss';

import { ThemeButton } from '@/components/ThemeButton/ThemeButton';

export const Container = () => {
  /* const [value, setValue] = useState('');
  const [debounce] = useDebouncedValue(value, 500); */

  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding='md'
      header={{ height: { base: 200, md: 140 } }}
      navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: !opened } }}

    >
      <AppShell.Header className={styles.header} p='md'>
        <Group visibleFrom='sm'>
          <Link to='/'>
            <Title order={2}>Characters</Title>
          </Link>
          <Link to='/locations'>
            <Title order={2}>Locations</Title>
          </Link>
          <Link to='/episodes'>
            <Title order={2}>Episodes</Title>
          </Link>
        </Group>

        <img src='/src/assets/Rick_and_Morty.svg' alt='Rick and Morty logo' height={70} />

        <Group justify='space-between' h='100%' p='md' preventGrowOverflow={false}>
          <ThemeButton />
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p='md' className={styles.navbar}>
        <Group p='md'>
          <Link to='/'>
            <Title order={2}>Персонажи</Title>
          </Link>
          <Link to='/locations'>
            <Title order={2}>Локации</Title>
          </Link>
          <Link to='/episodes'>
            <Title order={2}>Эпизоды</Title>
          </Link>
        </Group>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
