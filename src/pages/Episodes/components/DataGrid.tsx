import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card, Center, Grid, Pagination, Stack, Text, Title } from '@mantine/core';

import type { Episodes, FilterEpisode } from '@/@types/api';
import { CustomLoader } from '@/components/CustomLoader/CustomLoader';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { GET_EPISODES } from '@/utils/graphql/requests';

interface DataGridProps {
  setPages: (page: number) => void;
  filters: FilterEpisode;
  debounceName: string;
}

export const DataGrid = (
  { setPages, filters, debounceName }: DataGridProps) => {
  const { data, loading, error, refetch } = useQuery<Episodes, FilterEpisode>(GET_EPISODES, {
    variables: {
      page: filters.page,
      name: debounceName,
      episode: filters.episode
    }
  });

  if (loading) return <CustomLoader />;
  if (error) return <ErrorMessage refetch={refetch} error={error} />;

  const episodes = data?.episodes;

  return (
    <>
      {
        episodes && episodes.results.length > 0
          ? (
            <>
              <Grid>
                {episodes.results.map((episode) => (
                  <Grid.Col key={episode.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                    <Link to={`/episodes/${episode.id}`}>

                      <Card shadow='sm' padding='md' radius='md' withBorder h='100%'>
                        <Stack align='center'justify='center'>
                          <Title order={3}>{episode.name}</Title>
                          <Text component='p'> Episode: {episode.episode}</Text>
                          <Text component='p'>Episode air date: {episode.air_date}</Text>
                        </Stack>
                      </Card>

                    </Link>
                  </Grid.Col>
                ))}
              </Grid>
              {
                episodes.info.pages > 1
                  ? (
                    <Center p='lg'>
                      <Pagination
                        value={filters.page}
                        onChange={(page) => setPages(page)}
                        total={episodes.info.pages}
                        color='teal.6'
                      />
                    </Center>
                  )
                  : null
              }
            </>
          )
          : <Center>No data</Center>
      }
    </>
  );
};
