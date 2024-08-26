import { useEffect, useState } from 'react';
import { Box, Button, Divider, Group, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import { DataGrid } from './components/DataGrid';

import type { FilterEpisode } from '@/@types/api';
import { ClearInput } from '@/components/ClearInput/ClearInput';
import { FilterSelect } from '@/components/FilterSelect/FilterSelect';
import { SEASON_SERIES, SEASONS } from '@/utils/constant';

interface FilterEpisodeWithSeason extends FilterEpisode {
  season: string;
  seasonEpisodes: string;
}

export const EpisodesPage = () => {
  const [filters, setFilters] = useState<FilterEpisodeWithSeason>({
    page: 1,
    name: '',
    season: '',
    seasonEpisodes: '',
    episode: ''
  });

  const [debounceName] = useDebouncedValue(filters.name, 500);

  useEffect(() => {
    const NormalizeEpisode = (season: string, episode: string) => {
      const normSeason = String(+season < 10 ? `0${season}` : season);
      const normEpisode = episode ? String(+episode < 10 ? `0${episode}` : episode) : '';

      setFilters({ ...filters, episode: `S${normSeason}E${normEpisode}` });
    };

    if (filters.season || filters.seasonEpisodes) NormalizeEpisode(filters.season, filters.seasonEpisodes);
  }, [filters.season, filters.seasonEpisodes]);

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      name: '',
      season: '',
      seasonEpisodes: '',
      episode: ''
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
      <Stack align='flex-start' justify='center'>

        <Group>
          <ClearInput value={filters.name} type='name' changeInput={(type, value) => handleSelectFilters(type, value)} />
        </Group>

        <Group>
          <FilterSelect
            value={filters.season}
            values={SEASONS}
            type='season'
            setValue={(type, value) => handleSelectFilters(type, value)}
            placeholder='season'

          />
          <FilterSelect
            value={filters.seasonEpisodes}
            type='seasonEpisodes'
            values={filters.season
              ? Array.from(Array(Number(SEASON_SERIES[+filters.season - 1])
              ), (_, i) => (i + 1).toString()) : []}
            setValue={(type, value) => handleSelectFilters(type, value)}
            placeholder='episode'
            disable={!filters.season}
          />
        </Group>

        <Button
          size='md'
          radius='md'
          variant='outline'
          color='teal.6'
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </Stack>

      <Divider my='md' color='teal.6' />

      <Box>
        <DataGrid
          filters={filters}
          setPages={(page) => handleChangePage(page)}
          debounceName={debounceName}
        />
      </Box>

    </>
  );
};
