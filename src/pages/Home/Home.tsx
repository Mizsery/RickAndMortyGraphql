import { useState } from 'react';
import { Box, Button, Group } from '@mantine/core';
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
    setFilters({ ...filters, [type]: value });
  };

  return (
    <>
      <Group grow py='md' justify='center' className={clsx(styles.home)}>

        <ClearInput value={filters.name} type='name' changeInput={(type, value) => handleSelectFilters(type, value)} />
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
        <ClearInput value={filters.species} type='species' changeInput={(type, value) => handleSelectFilters(type, value)} />
        <ClearInput value={filters.type} type='type' changeInput={(type, value) => handleSelectFilters(type, value)} />

        <Button size='md' radius='md' variant='outline' color='teal.6' onClick={handleClearFilters}>Clear Filters</Button>
      </Group>

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
