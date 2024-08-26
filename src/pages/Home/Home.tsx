import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Divider, Group, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import type { Characters, CompatibleData, FilterCharacter } from '@/@types/api';
import { ClearFilterButton } from '@/components/ClearFilterButton/ClearFilterButton';
import { ClearInput } from '@/components/ClearInput/ClearInput';
import { CustomLoader } from '@/components/CustomLoader/CustomLoader';
import { DataGrid } from '@/components/DataGrid/DataGrid';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { FilterSelect } from '@/components/FilterSelect/FilterSelect';
import { GENDER, STATUS } from '@/utils/constant';
import { GET_CHARACTERS } from '@/utils/graphql/requests';
import { checkEmptyFilters, handleChangeFilters, handleChangePage, handleClearFilters } from '@/utils/helpers';

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

  const { data, loading, error, refetch } = useQuery<Characters, FilterCharacter>(GET_CHARACTERS, {
    variables: {
      page: filters.page,
      name: debounceFilters.name,
      status: filters.status,
      species: debounceFilters.species,
      type: debounceFilters.type,
      gender: filters.gender
    }
  });

  const characters = data?.characters;

  return (
    <>
      <Stack align='flex-start' justify='center'>
        <Group>
          <ClearInput value={filters.name} type='name' changeInput={(type, value) => handleChangeFilters(type, value, setFilters, filters)} />
          <ClearInput value={filters.species} type='species' changeInput={(type, value) => handleChangeFilters(type, value, setFilters, filters)} />
          <ClearInput value={filters.type} type='type' changeInput={(type, value) => handleChangeFilters(type, value, setFilters, filters)} />
        </Group>

        <Group>
          <FilterSelect
            value={filters.status}
            type='status'
            values={STATUS}
            setValue={(type, value) => handleChangeFilters(type, value, setFilters, filters)}
            placeholder='Status'

          />
          <FilterSelect
            value={filters.gender}
            type='gender'
            values={GENDER}
            setValue={(type, value) => handleChangeFilters(type, value, setFilters, filters)}
            placeholder='Gender'

          />
        </Group>

        <ClearFilterButton
          handleClearFilters={() => handleClearFilters(setFilters)}
          disabled={checkEmptyFilters(filters)}
        />
      </Stack>

      <Divider my='md' color='teal.6' />

      <Box>
        {
          loading ? <CustomLoader /> : error ? <ErrorMessage refetch={refetch} error={error} />
            : characters && characters.results.length > 0 && (
              <DataGrid
                type='characters'
                data={characters as CompatibleData<Characters>}
                currentPage={filters.page}
                totalPages={characters.info.pages}
                setPages={(page) => handleChangePage(page, setFilters, filters)}
                image
                textComponents={[
                  { text: 'Species:', type: 'species' },
                  { text: 'Type: ', type: 'type' },
                  { text: 'Status: ', type: 'status' }
                ]}
              />
            )
        }
      </Box>
    </>
  );
};
