import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Divider, Group, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import type { CompatibleData, Episodes, FilterEpisode } from '@/@types/api';
import { ClearFilterButton } from '@/components/ClearFilterButton/ClearFilterButton';
import { ClearInput } from '@/components/ClearInput/ClearInput';
import { CustomLoader } from '@/components/CustomLoader/CustomLoader';
import { DataGrid } from '@/components/DataGrid/DataGrid';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { FilterSelect } from '@/components/FilterSelect/FilterSelect';
import { SEASON_SERIES, SEASONS } from '@/utils/constant';
import { GET_EPISODES } from '@/utils/graphql/requests';
import { checkEmptyFilters, handleChangeFilters, handleChangePage, handleClearFilters } from '@/utils/helpers';

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

    if (filters.season || filters.seasonEpisodes)
      NormalizeEpisode(filters.season, filters.seasonEpisodes);
  }, [filters.season, filters.seasonEpisodes]);

  const { data, loading, error, refetch } = useQuery<Episodes, FilterEpisode>(GET_EPISODES, {
    variables: {
      page: filters.page,
      name: debounceName,
      episode: filters.episode
    }
  });

  const episodes = data?.episodes;

  return (
    <>
      <Stack align='flex-start' justify='center'>
        <Group>
          <ClearInput value={filters.name} type='name' changeInput={(type, value) => handleChangeFilters(type, value, setFilters, filters)} />
        </Group>

        <Group>
          <FilterSelect
            value={filters.season}
            values={SEASONS}
            type='season'
            setValue={(type, value) => handleChangeFilters(type, value, setFilters, filters)}
            placeholder='season'

          />
          <FilterSelect
            value={filters.seasonEpisodes}
            type='seasonEpisodes'
            values={filters.season
              ? Array.from(Array(Number(SEASON_SERIES[+filters.season - 1])
              ), (_, i) => (i + 1).toString()) : []}
            setValue={(type, value) => handleChangeFilters(type, value, setFilters, filters)}
            placeholder='episode'
            disable={!filters.season}
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
            : episodes && episodes.results.length > 0 && (
              <DataGrid
                type='episodes'
                data={episodes as CompatibleData<Episodes>}
                currentPage={filters.page}
                totalPages={episodes.info.pages}
                setPages={(page) => handleChangePage(page, setFilters, filters)}
                textComponents={[
                  { text: 'Episode:', type: 'episode' },
                  { text: 'Episode air date: ', type: 'air_date' }
                ]}
              />
            )
        }
      </Box>

    </>
  );
};
