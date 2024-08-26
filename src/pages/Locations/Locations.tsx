import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Divider, Group, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import type { CompatibleData, FilterLocation, Locations } from '@/@types/api';
import { ClearFilterButton } from '@/components/ClearFilterButton/ClearFilterButton';
import { ClearInput } from '@/components/ClearInput/ClearInput';
import { CustomLoader } from '@/components/CustomLoader/CustomLoader';
import { DataGrid } from '@/components/DataGrid/DataGrid';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { GET_LOCATIONS } from '@/utils/graphql/requests';
import { checkEmptyFilters, handleChangeFilters, handleChangePage, handleClearFilters } from '@/utils/helpers';

export const LocationsPage = () => {
  const [filters, setFilters] = useState<FilterLocation>({
    page: 1,
    name: '',
    type: '',
    dimension: ''
  });

  const [debounceFilters] = useDebouncedValue(filters, 500);

  const { data, loading, error, refetch } = useQuery<Locations, FilterLocation>(GET_LOCATIONS, {
    variables: {
      page: filters.page,
      name: debounceFilters.name,
      type: debounceFilters.type,
      dimension: debounceFilters.dimension
    }
  });

  const locations = data?.locations;

  return (
    <>
      <Stack align='flex-start' justify='center'>
        <Group>
          <ClearInput value={filters.name} type='name' changeInput={(type, value) => handleChangeFilters(type, value, setFilters, filters)} />
          <ClearInput value={filters.type} type='type' changeInput={(type, value) => handleChangeFilters(type, value, setFilters, filters)} />
          <ClearInput value={filters.dimension} type='dimension' changeInput={(type, value) => handleChangeFilters(type, value, setFilters, filters)} />
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
            : locations && locations.results.length > 0 && (
              <DataGrid
                type='locations'
                data={locations as CompatibleData<Locations>}
                currentPage={filters.page}
                totalPages={locations.info.pages}
                setPages={(page) => handleChangePage(page, setFilters, filters)}
                textComponents={[
                  { text: 'Location type:', type: 'type' },
                  { text: 'Dimension: ', type: 'dimension', center: true }
                ]}
              />
            )
        }
      </Box>

    </>
  );
};
