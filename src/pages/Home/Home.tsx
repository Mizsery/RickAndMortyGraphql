import { useState } from 'react';
import { Box, Button, Divider, Group, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import clsx from 'clsx';

import { DataGrid } from './components/DataGrid';

import styles from './Home.module.scss';

import type { FilterCharacter } from '@/@types/api';
import { ClearInput } from '@/components/ClearInput/ClearInput';
import { FilterSelect } from '@/components/FilterSelect/FilterSelect';
import { GENDER, STATUS } from '@/utils/constant';

export const Home = () => {
  const [filters, setFilters] = useState<FilterCharacter>({
    page: 1,
    name: '',
    status: '',
    gender: '',
    species: '',
    type: ''
  });

  const [debounceFilters] = useDebouncedValue(filters, 500);

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      name: '',
      status: '',
      gender: '',
      species: '',
      type: ''
    });
  };

  const handleChangePage = (page: number) => {
    setFilters({ ...filters, page });
  };

  const handleSelectFilters = (type: string, value: string) => {
    setFilters({ ...filters, page: 1, [type]: value });
  };

  return (
    <>
      <Stack align='flex-start' justify='center' className={clsx(styles.home)}>

        <Group>
          <ClearInput value={filters.name} type='name' changeInput={(type, value) => handleSelectFilters(type, value)} />
          <ClearInput value={filters.species} type='species' changeInput={(type, value) => handleSelectFilters(type, value)} />
          <ClearInput value={filters.type} type='type' changeInput={(type, value) => handleSelectFilters(type, value)} />
        </Group>

        <Group>
          <FilterSelect
            value={filters.status}
            type='status'
            values={STATUS}
            setValue={(type, value) => handleSelectFilters(type, value)}
            placeholder='Status'

          />
          <FilterSelect
            value={filters.gender}
            type='gender'
            values={GENDER}
            setValue={(type, value) => handleSelectFilters(type, value)}
            placeholder='Gender'

          />
        </Group>

        <Button size='md' radius='md' variant='outline' color='teal.6' onClick={handleClearFilters}>Clear Filters</Button>
      </Stack>

      <Divider my='md' color='teal.6' />

      <Box className={clsx(styles)}>
        <DataGrid
          setPages={(page) => handleChangePage(page)}
          filters={filters}
          debounceFilters={debounceFilters}
        />
      </Box>

    </>
  );
};
